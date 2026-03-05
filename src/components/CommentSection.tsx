import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MessageCircle, Trash2 } from "lucide-react";

type Comment = {
  id: string;
  movie_id: number;
  user_id: string | null;
  author_name: string;
  content: string;
  created_at: string;
};

const CommentSection = ({ movieId }: { movieId: number }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [guestName, setGuestName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("movie_id", movieId)
      .order("created_at", { ascending: false });
    if (data) setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    const authorName = user ? (user.user_metadata?.username || "User") : (guestName.trim() || "Guest");
    setLoading(true);
    const { error } = await supabase.from("comments").insert({
      movie_id: movieId,
      user_id: user?.id || null,
      author_name: authorName,
      content: content.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error("Failed to post comment");
    } else {
      setContent("");
      fetchComments();
    }
  };

  const handleDelete = async (commentId: string) => {
    await supabase.from("comments").delete().eq("id", commentId);
    fetchComments();
  };

  return (
    <div>
      <h3 className="font-display text-2xl text-foreground flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5" /> Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        {!user && (
          <Input
            placeholder="Your name (optional)"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            maxLength={50}
          />
        )}
        <Textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={500}
          required
        />
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="rounded-lg bg-card border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-body text-sm font-semibold text-foreground">{c.author_name}</span>
                <span className="font-body text-xs text-muted-foreground">
                  {new Date(c.created_at).toLocaleDateString()}
                </span>
              </div>
              {user && c.user_id === user.id && (
                <button onClick={() => handleDelete(c.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="font-body text-sm text-muted-foreground mt-2">{c.content}</p>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-muted-foreground font-body text-sm text-center py-8">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

"use client";
import {useState} from "react";
import {Button} from "../ui/button";

function Comment({comment}: {comment: string}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Check if text is more than 130 characters
  const longComment = comment.length > 130;
  // Slice comment if long , otherwise display all of it
  const displayComment = longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;

  // Display button if comment long
  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longComment && (
        <Button variant="link" className="pl-0 text-muted-foreground" onClick={toggleExpanded}>
          {isExpanded ? "Show Less" : "Show more"}
        </Button>
      )}
    </div>
  );
}

export default Comment;

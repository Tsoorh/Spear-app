import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { catchService } from "../../../services/catches.service.js";

export function CatchDetails() {
  const catchId = useParams();
  const [currCatch, setCurrCatch] = useState({});

  useEffect(() => {
    getCatch();
  }, [catchId]);

  async function getCatch() {
    const data = await catchService.getById();
    setCurrCatch(data);
  }

  if (!currCatch) return "Loading...";
  else {
    return (<>
    {/* פירוט על התפיסה והכל !  */}
    </>)
  }
}

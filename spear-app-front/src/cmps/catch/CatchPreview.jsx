import { useNavigate } from "react-router"

export function CatchPreview(catchItem) {
    const navigate = useNavigate();
    return(
        <article className="catch-preview">
            <img src={catchItem.img} alt={fisherman+"-"+fish}/>
            <p>{catchItem.fisherman} With a {catchItem.weight} kg of {catchItem.fish}</p>
            <button onClick={navigate(`/gallery/catch/${catchItem._Id}`)}></button>
        </article>
    )
    
}
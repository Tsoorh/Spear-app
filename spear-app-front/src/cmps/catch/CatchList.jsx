import { useEffect } from "react";
import { CatchPreview } from "./CatchPreview";
import { catchService } from "../../../services/catches.service.js";

export function CatchList() {
    const [catches,setCatches] = useState([]);

    useEffect(()=>{
        getCatches()
    },[])

    async function getCatches() {
        // const allcatches = await catchService.getCatches();
    }
    return(
        <section>
            {catches.map(item=>{
                <CatchPreview item={item} key={item._id}/>
            })}
        </section>   
    )
}
//@ts-ignore
import { PubSubManger} from "./PubSubManager";

setInterval(() => {
    PubSubManger.getInstance().userSubscribe(Math.random().toString(), "APPL");
}, 5000)
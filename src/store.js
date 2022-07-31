import globalHook from "use-global-hook"
import * as actions from "./actions"

const initialState={
    isLogin:false
}
const useGlobal=globalHook(initialState,actions);
export default useGlobal
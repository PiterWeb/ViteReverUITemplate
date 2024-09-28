import {$Component, $Show, $useEffect, $useSignal} from "reverui"
import Counter from "./Counter"

export default function Expander(this: any) {

    const showExpanded = $useSignal(true)

    $useEffect(() => {
        console.log(showExpanded.value)
    }, [showExpanded])

    function toogleExpand() {
        showExpanded.value = !showExpanded.value
    }
    return (
        <div>
            <button onclick={toogleExpand}>
                Expand
            </button>
            <$Show when={showExpanded.value}>
                <$Component element={Counter} ref={this} props={{}} />
            </$Show>
            
        </div>
    )

}
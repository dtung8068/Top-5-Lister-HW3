import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    function handleUndo() {
        if(!store.isItemEditActive) {
            store.undo();
        }

    }
    function handleRedo() {
        if(!store.isItemEditActive) {
            store.redo();
        }

    }
    function handleClose() {
        if(!store.isItemEditActive) {
            history.push("/");
            store.closeCurrentList();
        }
    }
    let undoButtonClass = "top5-button-disabled";
    let redoButtonClass = "top5-button-disabled";
    let closeButtonClass = "top5-button-disabled";
    let editStatusUndo = true;
    let editStatusRedo = true;
    let editStatusClose = true;
    if(store.hasUndo() && !store.isItemEditActive) {
        undoButtonClass = "top5-button";
        editStatusUndo = false;
    }
    if(store.hasRedo() && !store.isItemEditActive) {
        redoButtonClass = "top5-button";
        editStatusRedo = false;
    }
    if(store.currentList && !store.isItemEditActive) {
        closeButtonClass = "top5-button";
        editStatusClose = false;
    }
    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatusUndo}
                id='undo-button'
                onClick={handleUndo}
                className={undoButtonClass}>
                &#x21B6;
            </div>
            <div
                disabled={editStatusRedo}
                id='redo-button'
                onClick={handleRedo}
                className={redoButtonClass}>
                &#x21B7;
            </div>
            <div
                disabled={editStatusClose}
                id='close-button'
                onClick={handleClose}
                className={closeButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;
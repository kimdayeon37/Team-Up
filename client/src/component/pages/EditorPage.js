import GlobalNavBar from "../navigation/GlobalNavBarComponent";
import LocalNavBarComponent from "../navigation/LocalNavBarComponent";
import EditorMenuComponent from "../editor/EditorMenuComponent";
import EditorComponent from "../editor/EditorComponent";

function EditorPage() {
  return (
    <div>
      <LocalNavBarComponent />
      <EditorMenuComponent />
    </div>
  );
}

export default EditorPage;

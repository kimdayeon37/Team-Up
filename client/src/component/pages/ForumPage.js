import { React } from "react";
import LocalNavBarComponent from "../navigation/LocalNavBarComponent";
import GlobalNavBarComponent from "../navigation/GlobalNavBarComponent";

import ForumComponent from "../forum/ForumComponent";

function PostListPage(props) {
  return (
    <div>
      {/* <GlobalNavBarComponent /> */}
      <LocalNavBarComponent />
      <ForumComponent />
    </div>
  );
}

export default PostListPage;

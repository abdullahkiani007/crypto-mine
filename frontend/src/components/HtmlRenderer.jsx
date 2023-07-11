import React from "react";

function HtmlRenderer({ htmlString }) {
  return (
    <div
      className="text-start pl-8 text-base font-normal list-disc decoration-inherit myCustomStyle "
      dangerouslySetInnerHTML={{ __html: htmlString }}
    ></div>
  );
}

export default HtmlRenderer;

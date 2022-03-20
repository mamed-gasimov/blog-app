import { Fragment } from "react";

export const getContentFragment = (index, text, obj, type) => {
  let modifiedText = text;

  if (obj) {
    if (obj.bold) {
      modifiedText = (<b key={index}>{text}</b>);
    }

    if (obj.italic) {
      modifiedText = (<em key={index}>{text}</em>);
    }

    if (obj.underline) {
      modifiedText = (<u key={index}>{text}</u>);
    }
  }

  switch (type) {
    case 'heading-three':
      return (
        <h3 key={index} className="text-xl font-semibold mb-4">
          {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
        </h3>
      );
    case 'paragraph':
      return <p key={index} className="mb-8">{modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}</p>;
    case 'heading-four':
    case 'heading-six':
      return (
        <h4 key={index} className="text-md font-semibold mb-4">
          {modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}
        </h4>
      );
    case 'code-block':
      return (
        <div className="bg-orange-100 text-black italic p-6 pb-4 mb-5">
          <code className="font-serif">{modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}</code>
        </div>
      );
    case 'image':
      return (
        <img
          key={index}
          alt={obj.title}
          height={obj.height}
          width={obj.width}
          src={obj.src}
        />
      );
    default:
      return modifiedText;
  }
};

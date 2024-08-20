const DynamicLink = ({ children, condition1, func }) => {
  if (condition1) {
    return (
      <a className="hover:bg-slate-100" onClick={func}>
        {children}
      </a>
    );
  } else {
    return <a>{children}</a>;
  }
};

export default DynamicLink;

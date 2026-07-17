const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <div className="text-center text-sm mt-6 opacity-40">
      <p> &copy; {year} Pogue & Company CPAs PLLC. All Rights Reserved</p>
    </div>
  );
};
export default Copyright;

import second from "../../assets/logonuevo.png";
function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-accent h-12 text-white ">
      <div className="-mt-2">
        <p className="inline">
          <img src={second} className="w-10 inline" />
          Copyright © 2022 - All right reserved by QRO
        </p>
      </div>
    </footer>
  );
}

export default Footer;

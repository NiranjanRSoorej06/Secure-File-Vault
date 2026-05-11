type Props = {
  onLogout: () => void;
};
function Header({ onLogout }:Props){
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems:"center",
                marginBottom:"20px",
            }}
        >
            <h2 className="text-4xl font-bold">
                Secure File Vault
            </h2>

            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}

export default Header;
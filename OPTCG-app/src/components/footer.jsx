



function Footer() {

    const date = new Date().toLocaleDateString()
    return (
        <>
            <footer>
                <div className="footer-content">
                    <p>&copy; 2025 One Piece TCG Log. All rights reserved. Date: {date}</p>
                    <div className="footer-links">


                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
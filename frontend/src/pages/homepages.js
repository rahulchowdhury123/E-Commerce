import ProductCarouselComponent from "../components/productCarouselComponent"
import Categorycardcomponent from "../components/categorycardcomponent";
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/esm/Container";
const HomePage = () => {
    const categories = [
        "Tablets",
        "Monitors",
        "Games",
        "Printers",
        "Software",
        "Cameras",
        "Books",
        "Videos",
    ];
    return (

        <>

            <ProductCarouselComponent />
            <Container>
                <Row xs={1} md={2} className="g-4 mt-5">
                    {
                        categories.map((category,idx) => <Categorycardcomponent key={idx} category={category} idx={idx}/>)
                    }
                </Row>
            </Container>
        </>
    );
}
export default HomePage
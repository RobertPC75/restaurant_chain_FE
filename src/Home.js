import { Carousel as BootstrapCarousel, Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

function Home() {
  return (
    <Container style={{ backgroundColor: '#e0e0e0', minWidth: '600px' }}>
      {/* Bootstrap Carousel with sales and news */}
      <BootstrapCarousel style={{ backgroundColor: '#f8d7da', marginTop: '20px' }}>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Sale+1"
            alt="First slide"
          />
          <BootstrapCarousel.Caption>
            <h3>Sale 1</h3>
            <p>Details about Sale 1</p>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
        <BootstrapCarousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Sale+2"
            alt="Second slide"
          />
          <BootstrapCarousel.Caption>
            <h3>Sale 2</h3>
            <p>Details about Sale 2</p>
          </BootstrapCarousel.Caption>
        </BootstrapCarousel.Item>
        {/* Add more Carousel.Items as needed */}
      </BootstrapCarousel>

      {/* Section for fun facts */}
      <div
        style={{
          backgroundColor: '#d4edda',
          textAlign: 'center',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <h2>Info</h2>
        <p>Placeholder content.</p>
      </div>

      {/* Bottom section with contact numbers, menu link, and social icons */}
      <Row style={{ backgroundColor: '#bee5eb', padding: '20px', marginTop: '20px' }}>
        <Col>
          <div className="contact-numbers">
            <h3>Número de domicilio y servicio al cliente:</h3>
            <ul>
              <li>Bogotá: 000 00 00</li>
              <li>Medellín: 000 00 00</li>
              <li>Cali: 000 00 00</li>
              <li>Desde tu celular: 000 000 00 00</li>
            </ul>
          </div>
        </Col>
        <Col>
          <h3>Menu</h3>
          <a href="/menu">Menu</a>
        </Col>
        <Col>
          <h3>Social Networks</h3>
          {/* Social icons with links */}
          <div>
            <a href="#facebook"><FaFacebook size={30} style={{ marginRight: '10px' }} /></a>
            <a href="#twitter"><FaTwitter size={30} style={{ marginRight: '10px' }} /></a>
            <a href="#instagram"><FaInstagram size={30} style={{ marginRight: '10px' }} /></a>
            <a href="#youtube"><FaYoutube size={30} style={{ marginRight: '10px' }} /></a>
            <a href="#tiktok"><FaTiktok size={30} /></a>
            {/* Add more icons and links as needed */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

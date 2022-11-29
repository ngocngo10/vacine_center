import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Message from '../../components/Message';
import VaccineInformItem from '../../components/VaccineInformItem';
import Container from '../../layout/Container';
import { getVaccineDetails } from '../../actions/vaccine_detail.action';
import './index.css';

const VaccineDetailPage = () => {
  const vaccineInform = [
    {
      id: 1,
      title: 'Thông tin vắc xin',
      content: `<p><strong>Vắc xin thế hệ mới Gardasil 9</strong> được xem là vắc xin bình đẳng giới vì
      mở rộng cả đối tượng và phạm vi phòng bệnh rộng hơn ở nam và nữ giới, bảo vệ khỏi 9 tuýp virus HPV phổ biến
      6, 11, 16, 18, 31, 33, 45, 52 và 58, với hiệu quả bảo vệ lên đến trên 94%.</p>
    <h3><strong>Nguồn gốc</strong></h3>
    <p><strong>Vắc xin Gardasil 9</strong> được nghiên cứu và phát triển bởi tập đoàn hàng
      đầu thế giới về dược phẩm và chế phẩm sinh học – <a href="https://www.merckvaccines.com/gardasil9/" target="_blank"
        rel="nofollow noopener">Merck Sharp &amp; Dohme (MSD &#8211; Mỹ)</a>.</p>
    <h3><strong>Đường tiêm</strong></h3>
    <ul>
      <li>Vaccine Gardasil 9 được chỉ định tiêm bắp. Vị trí phù hợp là vùng cơ delta của phần
        trên cánh tay hoặc ở vùng trước phía trên đùi.</li>
      <li>Không được tiêm Gardasil 9 vào mạch máu, tiêm dưới da hoặc tiêm trong da.</li>
      <li>Không được trộn lẫn vắc xin trong cùng một ống tiêm với bất kỳ loại vắc xin và dung
        dịch nào khác.</li>
    </ul>
    <h3><strong>Chống chỉ định</strong></h3>
    <ul>
      <li>Người quá mẫn với các hoạt chất hoặc với bất kỳ tá dược nào của vắc xin được liệt
        kê trong phần “Thành phần”.</li>
      <li>Những người bị quá mẫn sau khi tiêm Gardasil 9 hoặc Gardasil trước đây không nên
        tiêm Gardasil 9.</li>
    </ul>
    <h3><strong>Thận trọng khi sử dụng</strong></h3>
    <p>Hoãn tiêm chủng ở những người đang bị sốt nặng cấp tính. Tuy nhiên, tình trạng nhiễm
      trùng nhẹ, như nhiễm trùng đường hô hấp trên nhẹ hoặc sốt mức độ nhẹ không chống chỉ định tiêm Gardasil 9.</p>
    <p>Vắc xin chỉ dùng để dự phòng, không có tác dụng điều trị. Do đó, <strong>vắc xin
        Gardasil 9</strong> không chỉ định để điều trị ung thư cổ tử cung, âm hộ, âm đạo và hậu môn, tổn thương loạn sản
      cổ tử cung, âm hộ, âm đạo và hậu môn hoặc mụn cóc sinh dục mức độ cao…, không ngăn ngừa các tổn thương do tuýp HPV
      có trong vắc xin ở những người bị nhiễm tuýp HPV đó tại thời điểm tiêm chủng. Vắc xin này nên được dùng thận trọng
      cho những người bị giảm tiểu cầu hoặc có bất kỳ rối loạn đông máu nào vì chảy máu có thể xảy ra sau khi tiêm bắp ở
      những người này.</p>
    <p>Các nghiên cứu theo dõi dài hạn hiện đang được tiến hành để xác định thời gian bảo vệ.
      Không có dữ liệu về độ an toàn, tính sinh miễn dịch hoặc hiệu quả để hỗ trợ cho việc sử dụng thay thế cho nhau giữa
      Gardasil 9 với vắc xin HPV nhị giá hoặc tứ giá.</p>
    <h3><strong>Khả năng sinh sản, phụ nữ có thai và cho con bú</strong></h3>
    <h4><strong>1. Phụ nữ có thai</strong></h4>
    <p>Dữ liệu về phụ nữ có thai cho thấy không có biểu hiện dị dạng cũng không có độc tính
      đối với thai/trẻ sơ sinh do Gardasil 9.</p>
    <p>Các nghiên cứu trên động vật không cho thấy độc tính đối với sinh sản. Tuy nhiên,
      những dữ liệu này được xem là không đủ để khuyến cáo sử dụng Gardasil 9 trong thời kỳ mang thai.</p>
    <p>Nên hoãn việc tiêm chủng cho đến khi kết thúc thai kỳ.</p>
    <h4><strong>2. Phụ nữ cho con bú</strong></h4>
    <p><strong>Vắc xin Gardasil 9</strong> có thể được sử dụng trong thời kỳ cho con bú.</p>
    <h4><strong>3. Khả năng sinh sản</strong></h4>
    <p>Không có dữ liệu về ảnh hưởng của Gardasil 9 đến khả năng sinh sản ở người. Các nghiên
      cứu trên động vật không cho thấy ảnh hưởng có hại đến khả năng sinh sản.</p>
    <h3><strong>Tương tác thuốc</strong></h3>
    <p>Tính an toàn và tính sinh miễn dịch ở những người đã nhận được globulin miễn dịch hoặc
      các sản phẩm có nguồn gốc từ máu trong 3 tháng trước khi tiêm chủng chưa được nghiên cứu trong các thử nghiệm lâm
      sàng.</p>
    <h4><strong>1. Sử dụng với các vắc xin khác Gardasil 9</strong></h4>
    <p>Vắc xin Gardasil 9 có thể được dùng đồng thời với một vắc xin tăng cường kết hợp chứa
      Bạch hầu (d) và uốn ván (T) cùng với ho gà [thành phần vô bào] và/hoặc bại liệt [bất hoạt] (IPV) (vắc xin dTap,
      dT-IPV, dTap-IPV) và không có sự can thiệp đáng kể vào đáp ứng kháng thể đối với bất kỳ thành phần nào của một trong
      hai vắc xin. Điều này dựa trên các kết quả từ một thử nghiệm lâm sàng, trong đó vắc xin dTap-IPV kết hợp được sử
      dụng đồng thời với liều Gardasil 9 đầu tiên.</p>
    <h4><strong>2. Sử dụng với thuốc tránh thai chứa hormon</strong></h4>
    <p>Trong các nghiên cứu lâm sàng, 60,2% phụ nữ từ 16-26 tuổi <em>tiêm Gardasil 9</em> đã
      sử dụng thuốc tránh thai chứa hormon trong thời gian tiêm chủng ở các nghiên cứu lâm sàng. Sử dụng thuốc tránh thai
      chứa hormon dường như không ảnh hưởng đến đáp ứng miễn dịch đặc hiệu tuýp đối với Gardasil 9.</p>
    <h3><strong>Tương kỵ</strong></h3>
    <p>Không có nghiên cứu về sự tương hợp, không được trộn lẫn thuốc này với các thuốc khác.
    </p>
    <h3><strong>Tác dụng không mong muốn</strong></h3>
    <ul>
      <li>Phản ứng tại chỗ tiêm: Đau, sưng, nổi ban đỏ, chai cứng, ngứa, bầm tím, tăng nhạy
        cảm tại chỗ tiêm.</li>
      <li>Các phản ứng toàn thân khác: Sốt, nhức đầu, mệt mỏi, chóng mặt, buồn nôn.</li>
    </ul>
    <h3><strong>Bảo quản</strong></h3>
    <p><strong>Vắc xin Gardasil 9</strong> được bảo quản trong tủ lạnh (2°C &#8211; 8°C).
      Không để đông lạnh.</p>
    <p>Giữ ống tiêm chứa sẵn vắc xin trong hộp carton ngoài để tránh ánh sáng. Nên sử dụng
      Gardasil 9 càng sớm càng tốt sau khi được lấy ra khỏi tủ lạnh.</p>`
    },
    {
      title: 'Đối tượng',
      id: 2,
      content:
        '<p>Vắc xin Gardasil 9 được chỉ định tiêm chủng cho cả nam giới và nữ giới, từ 9 tuổi đến dưới 27 tuổi.<p>'
    }
  ];

  const dispatch = useDispatch();
  const vaccineDetail = useSelector((state) => state.vaccineDetail);
  const { loading, error, vaccine } = vaccineDetail;

  const { vaccineId } = useParams();

  useEffect(() => {
    dispatch(getVaccineDetails(vaccineId));
  }, []);

  return error ? (
    <Message description={error} />
  ) : (
    vaccine && (
      <>
        <Header />
        <main className="main-page">
          <Container>
            <nav className="path-nav">
              <p>
                <Link to="/" className="path-nav__link">
                  Trang chủ
                </Link>
                <span>/</span>
                <Link to="/vaccine-list" className="path-nav__link">
                  Thông tin sản phẩm vắc xin
                </Link>
                <span>/</span>
                <span></span>
              </p>
            </nav>
            <section className="section-vaccine-base-inform">
              <div className="vaccine-image">
                <img src={vaccine.vaccine.image} alt="vaccine-image" />
              </div>
              <div className="vaccine-base-inform">
                <h2 className="vaccine-name">{vaccine.vaccine.name}</h2>
                <hr />
                <p className="vaccine-des">{vaccine.vaccine.description}</p>
                <p className="vaccine_price">{/* 3.890.000₫ <del>3.590.000₫ </del> */}</p>
              </div>
            </section>
            <section className="section-vaccine-detail-inform">
              <Container>
                <div className="vaccine-detail-card">
                  <aside className="sidebar">
                    <ul className="sidebar-list">
                      {vaccine.vaccineDetails.length &&
                        vaccine.vaccineDetails.map((informItem, index) => (
                          <li key={informItem.id} className="sidebar-item">
                            <a href={`#inform-${informItem.id}`}>{`${index + 1}. ${
                              informItem.title
                            }`}</a>
                          </li>
                        ))}
                    </ul>
                  </aside>
                  <div className="vaccine-detail-inform">
                    <h3 className="inform-heading">Thông tin chi tiết vaccine</h3>
                    <ul className="inform-list">
                      {vaccine.vaccineDetails.length &&
                        vaccine.vaccineDetails.map((informItem, index) => (
                          <VaccineInformItem
                            id={index + 1}
                            key={informItem.id}
                            title={informItem.title}
                            content={informItem.content}
                          />
                        ))}
                    </ul>
                  </div>
                </div>
              </Container>
            </section>
          </Container>
        </main>
      </>
    )
  );
};

export default VaccineDetailPage;

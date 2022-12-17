import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import VaccineInformItem from '../../components/VaccineInformItem';
import Container from '../../layout/Container';
import { getVaccineDetails } from '../../actions/vaccine_detail.action';
import './index.css';

const VaccineDetailPage = () => {
  const dispatch = useDispatch();
  const vaccineInformList = useSelector((state) => state.vaccineInformList);
  const { error, vaccine, vaccineInforms, loading } = vaccineInformList;

  const { vaccineId } = useParams();

  useEffect(() => {
    dispatch(getVaccineDetails(vaccineId));
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    vaccine && (
      <>
        <main className="main-page">
          <Container>
            <section className="section-vaccine-base-inform">
              <div className="vaccine-image">
                <img src={vaccine.image} alt="vaccine-image" />
              </div>
              <div className="vaccine-base-inform">
                <h2 className="vaccine-name">{vaccine.name}</h2>
                <hr />
                <p className="vaccine-des">{vaccine.description}</p>
                <br></br>
                <p className="vaccine_price">{`${vaccine.price}  ₫`}</p>
              </div>
            </section>
            <section className="section-vaccine-detail-inform">
              <Container>
                <div className="vaccine-detail-card">
                  <aside className="sidebar">
                    <ul className="sidebar-list">
                      {vaccineInforms?.length &&
                        vaccineInforms.map((informItem, index) => (
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
                      {vaccineInforms?.length &&
                        vaccineInforms.map((informItem, index) => (
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

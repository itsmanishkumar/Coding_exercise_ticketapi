import Popup from "./Popup";
import React, { useState } from "react";
import "../App.css";
import ReactPaginate from "react-paginate";
//import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import Modal from "react-modal";
const UserData = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mda, setMda] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 25;
  const openModal = (id) => {
    setIsOpen(true);
    const selectedData = data.tickets.find((el) => el.id === id);
    setMda(selectedData);
  };
  const closeModal = () => {
    setIsOpen(false);
    setMda({});
  };
  // Calculate pagination indexes
  const indexOfLastRow = (currentPage + 1) * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.tickets
    ? data.tickets.slice(indexOfFirstRow, indexOfLastRow)
    : [];
  // Change page
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  return (
    <>
      {/* Render your table rows */}
      {currentRows.map((d, i) => (
        <tr key={i}>
          <td>{d.id}</td>
          <td>{d.created_at}</td>
          <td>{d.raw_subject}</td>
          <td>
            <button
              className="btn mt-3"
              style={{ backgroundColor: "pink", color: "black" }}
              onClick={() => openModal(d.id)}
            >
              View Details
            </button>
          </td>
        </tr>
      ))}
      {/* Pagination */}
      <ReactPaginate
        pageCount={Math.ceil(data.tickets?.length / rowsPerPage)}
        marginPagesDisplayed={7}
        pageRangeDisplayed={25}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      {/* Modal */}
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <h1>Details about Tickets </h1>
        {/* <h2>Start editing to see some magic happen!</h2> */}
        {/* Render the data from the selected row */}
        ID:<p>{mda.id}</p>
        Ticket Created :<p>{mda.created_at}</p>
        Subject :<p>{mda.raw_subject}</p>
        Case Summary :<p>{mda.description}</p>
        <button className="btn mt-3" onClick={closeModal}>
          Close{" "}
        </button>
      </Modal>
    </>
  );
};
export default UserData;

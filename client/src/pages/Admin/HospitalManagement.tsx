import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Toast, InputGroup } from "react-bootstrap";
import adminApi, { Hospital } from "../api/adminApi";

const HospitalManagement: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ show: boolean; hospital: Hospital | null }>({ show: false, hospital: null });
  const [confirmDelete, setConfirmDelete] = useState<Hospital | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "danger" }>({ show: false, message: "", type: "success" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    adminApi.getHospitals()
      .then(data => setHospitals(data))
      .catch(() => setToast({ show: true, message: "Failed to fetch hospitals.", type: "danger" }))
      .finally(() => setLoading(false));
  }, []);

  const filtered = hospitals.filter(
    h => h.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (hospital: Hospital) => {
    if (hospital.id) {
      adminApi.editHospital(hospital).then(updated => {
        setHospitals(hs => hs.map(h => h.id === updated.id ? updated : h));
        setToast({ show: true, message: "Hospital updated!", type: "success" });
      });
    } else {
      adminApi.addHospital(hospital).then(added => {
        setHospitals(hs => [...hs, added]);
        setToast({ show: true, message: "Hospital added!", type: "success" });
      });
    }
    setModal({ show: false, hospital: null });
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    adminApi.deleteHospital(id).then(() => {
      setHospitals(hs => hs.filter(h => h.id !== id));
      setToast({ show: true, message: "Hospital deleted.", type: "danger" });
      setConfirmDelete(null);
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Hospital Management</h2>
        <Button onClick={() => setModal({ show: true, hospital: null })} variant="success">+ Add Hospital</Button>
      </div>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Search by name" value={search} onChange={e => setSearch(e.target.value)} />
      </InputGroup>
      {loading ? <div>Loading...</div> : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th><th>Address</th><th>Phone</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(hospital => (
              <tr key={hospital.id}>
                <td>{hospital.name}</td>
                <td>{hospital.address}</td>
                <td>{hospital.phone}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => setModal({ show: true, hospital })}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => setConfirmDelete(hospital)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {/* Add/Edit Modal */}
      <Modal show={modal.show} onHide={() => setModal({ show: false, hospital: null })}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.hospital ? "Edit Hospital" : "Add Hospital"}</Modal.Title>
        </Modal.Header>
        <HospitalForm hospital={modal.hospital} onSave={handleSave} onCancel={() => setModal({ show: false, hospital: null })} />
      </Modal>
      {/* Confirm Delete Modal */}
      <Modal show={!!confirmDelete} onHide={() => setConfirmDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete hospital <b>{confirmDelete?.name}</b>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDelete(confirmDelete!.id)}>Delete</Button>
        </Modal.Footer>
      </Modal>
      {/* Toast Notifications */}
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        bg={toast.type}
        delay={2200}
        autohide
        style={{ position: 'fixed', bottom: 18, right: 18, zIndex: 9999 }}
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
};

type HospitalFormProps = {
  hospital: Hospital | null;
  onSave: (hospital: Hospital) => void;
  onCancel: () => void;
};

const HospitalForm: React.FC<HospitalFormProps> = ({ hospital, onSave, onCancel }) => {
  const [form, setForm] = useState<Hospital>(hospital || { id: undefined, name: '', address: '', phone: '' });

  // This makes sure when you edit, the modal updates if another hospital is selected
  useEffect(() => {
    setForm(hospital || { id: undefined, name: '', address: '', phone: '' });
  }, [hospital]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={form.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control name="address" value={form.address} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control name="phone" value={form.phone} onChange={handleChange} />
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit">{form.id ? "Update" : "Add"}</Button>
      </div>
    </Form>
  );
};

export default HospitalManagement;

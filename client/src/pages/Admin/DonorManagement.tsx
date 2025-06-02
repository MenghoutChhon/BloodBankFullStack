import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Toast, InputGroup } from "react-bootstrap";
import adminApi, { Donor } from "../api/adminApi";

const DonorManagement: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ show: boolean; donor: Donor | null }>({ show: false, donor: null });
  const [confirmDelete, setConfirmDelete] = useState<Donor | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "danger" }>({ show: false, message: "", type: "success" });
  const [search, setSearch] = useState("");

  // Fetch donors
  useEffect(() => {
    adminApi.getDonors()
      .then(setDonors)
      .catch(() => setToast({ show: true, message: "Failed to fetch donors.", type: "danger" }))
      .finally(() => setLoading(false));
  }, []);

  const filtered = donors.filter(
    d => d.name.toLowerCase().includes(search.toLowerCase()) ||
         d.blood.toLowerCase().includes(search.toLowerCase())
  );

  // CRUD handlers
  const handleSave = (donor: Donor) => {
    if (donor.id) {
      adminApi.editDonor(donor).then(updated => {
        setDonors(ds => ds.map(d => d.id === updated.id ? updated : d));
        setToast({ show: true, message: "Donor updated!", type: "success" });
      });
    } else {
      adminApi.addDonor(donor).then(added => {
        setDonors(ds => [...ds, added]);
        setToast({ show: true, message: "Donor added!", type: "success" });
      });
    }
    setModal({ show: false, donor: null });
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    adminApi.deleteDonor(id).then(() => {
      setDonors(ds => ds.filter(d => d.id !== id));
      setToast({ show: true, message: "Donor deleted.", type: "danger" });
      setConfirmDelete(null);
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Donor Management</h2>
        <Button onClick={() => setModal({ show: true, donor: null })} variant="success">+ Add Donor</Button>
      </div>

      <InputGroup className="mb-3">
        <Form.Control placeholder="Search by name or blood type" value={search} onChange={e => setSearch(e.target.value)} />
      </InputGroup>

      {loading ? <div>Loading...</div> : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th><th>Blood</th><th>Email</th><th>Phone</th><th>Last Donated</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(donor => (
              <tr key={donor.id}>
                <td>{donor.name}</td>
                <td>{donor.blood}</td>
                <td>{donor.email}</td>
                <td>{donor.phone}</td>
                <td>{donor.lastDonated}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => setModal({ show: true, donor })}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => setConfirmDelete(donor)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add/Edit Modal */}
      <Modal show={modal.show} onHide={() => setModal({ show: false, donor: null })}>
        <Modal.Header closeButton>
          <Modal.Title>{modal.donor ? "Edit Donor" : "Add Donor"}</Modal.Title>
        </Modal.Header>
        <DonorForm donor={modal.donor} onSave={handleSave} onCancel={() => setModal({ show: false, donor: null })} />
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal show={!!confirmDelete} onHide={() => setConfirmDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete donor <b>{confirmDelete?.name}</b>?</Modal.Body>
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

type DonorFormProps = {
  donor: Donor | null;
  onSave: (donor: Donor) => void;
  onCancel: () => void;
};

const DonorForm: React.FC<DonorFormProps> = ({ donor, onSave, onCancel }) => {
  const [form, setForm] = useState<Donor>(donor || {
    id: undefined, name: '', blood: '', email: '', phone: '', lastDonated: '',
  });

  useEffect(() => {
    setForm(donor || {
      id: undefined, name: '', blood: '', email: '', phone: '', lastDonated: '',
    });
  }, [donor]);

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
        <Form.Label>Blood Type</Form.Label>
        <Form.Control name="blood" value={form.blood} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" value={form.email} onChange={handleChange} type="email" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control name="phone" value={form.phone} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Donated</Form.Label>
        <Form.Control name="lastDonated" value={form.lastDonated} onChange={handleChange} type="date" />
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" type="submit">{form.id ? "Update" : "Add"}</Button>
      </div>
    </Form>
  );
};

export default DonorManagement;

// src/pages/Admin/Users.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Toast, Spinner } from "react-bootstrap";
import adminApi, { User } from "../api/adminApi";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ show: boolean; user: User | null }>({ show: false, user: null });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "danger" }>({
    show: false,
    message: "",
    type: "success"
  });

  useEffect(() => {
    adminApi.getUsers()
      .then(setUsers)
      .catch(() => setToast({ show: true, message: "Failed to fetch users.", type: "danger" }))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = (user: Omit<User, "id"> | User) => {
    if ("id" in user && user.id) {
      adminApi.editUser(user as User)
        .then(updated => {
          setUsers(us => us.map(u => u.id === updated.id ? updated : u));
          setToast({ show: true, message: "User updated!", type: "success" });
        })
        .catch(() => setToast({ show: true, message: "Update failed.", type: "danger" }));
    } else {
      adminApi.addUser(user)
        .then(added => {
          setUsers(us => [...us, added]);
          setToast({ show: true, message: "User added!", type: "success" });
        })
        .catch(() => setToast({ show: true, message: "Add failed.", type: "danger" }));
    }
    setModal({ show: false, user: null });
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    adminApi.deleteUser(id)
      .then(() => {
        setUsers(us => us.filter(u => u.id !== id));
        setToast({ show: true, message: "User deleted.", type: "danger" });
      })
      .catch(() => setToast({ show: true, message: "Delete failed.", type: "danger" }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users Management</h2>
        <Button onClick={() => setModal({ show: true, user: null })} variant="success">+ Add User</Button>
      </div>
      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" variant="danger" /> Loading...
        </div>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={user.role === "admin" ? "badge bg-danger" : "badge bg-secondary"}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td>
                  <Button size="sm" variant="info" onClick={() => setModal({ show: true, user })}>Edit</Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={modal.show} onHide={() => setModal({ show: false, user: null })} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal.user ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        {modal.show && (
          <UserForm
            user={modal.user}
            onSave={handleSave}
            onCancel={() => setModal({ show: false, user: null })}
          />
        )}
      </Modal>
      <Toast
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false, message: "" })}
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

type UserFormProps = {
  user: User | null;
  onSave: (user: Omit<User, "id"> | User) => void;
  onCancel: () => void;
};

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  // If user is editing, keep their id; if adding, no id.
  const [form, setForm] = useState<Omit<User, "id"> | User>(
    user ? { ...user } : { name: '', email: '', role: "staff" }
  );

  useEffect(() => {
    setForm(user ? { ...user } : { name: '', email: '', role: "staff" });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Minimal email validation
    if (!form.name.trim() || !/\S+@\S+\.\S+/.test(form.email)) return;
    onSave(form);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="user-name-input">Name</Form.Label>
        <Form.Control
          id="user-name-input"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="user-email-input">Email</Form.Label>
        <Form.Control
          id="user-email-input"
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="user-role-select">Role</Form.Label>
        <Form.Select
          id="user-role-select"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </Form.Select>
      </Form.Group>
      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel} type="button">Cancel</Button>
        <Button variant="primary" type="submit">{user ? "Update" : "Add"}</Button>
      </div>
    </Form>
  );
};

export default Users;

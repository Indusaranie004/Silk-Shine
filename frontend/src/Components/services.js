"use client"

import { useState, useEffect } from "react"
import { ServiceAPI } from "../Services/api"
import "../styles/services.css"

const ServicesContent = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filteredServices, setFilteredServices] = useState([])

  // Modal state
  const [editService, setEditService] = useState(null)
  const [addServiceModal, setAddServiceModal] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    imageFile: null
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 4

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    if (!Array.isArray(services)) {
      setFilteredServices([])
      return
    }
    const filtered = services.filter(
      (srv) =>
        srv.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        srv.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredServices(filtered)
    setCurrentPage(1) // Reset page when search changes
  }, [searchTerm, services])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await ServiceAPI.getAll()
      let serviceData = Array.isArray(response.data) ? response.data : response.data.content
      setServices(serviceData || [])
    } catch (err) {
      console.error(err)
      setError("Failed to load services from API")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (serviceId) => {
    try {
      await ServiceAPI.delete(serviceId)
      setServices(prev => prev.filter(srv => srv.id !== serviceId))
    } catch (err) {
      console.error(err)
      alert("Failed to delete service")
    }
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  // Open edit modal
  const handleEditClick = (service) => {
    setEditService(service)
    setFormData({
      serviceName: service.serviceName,
      category: service.category,
      price: service.price,
      description: service.description,
      imageFile: null
    })
  }

  // Open add modal
  const handleAddClick = () => {
    setAddServiceModal(true)
    setFormData({
      serviceName: "",
      category: "",
      price: "",
      description: "",
      imageFile: null
    })
  }

  // Close modals
  const handleCloseModal = () => {
    setEditService(null)
    setAddServiceModal(false)
  }

  const handleFormChange = (e) => {
    const { name, value, files } = e.target
    setFormData({ ...formData, [name]: files ? files[0] : value })
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("serviceName", formData.serviceName)
    data.append("category", formData.category)
    data.append("price", formData.price)
    data.append("description", formData.description)
    if (formData.imageFile) data.append("imageFile", formData.imageFile)

    try {
      await ServiceAPI.update(editService.id, data)
      fetchServices()
      handleCloseModal()
    } catch (err) {
      console.error(err)
      alert("Update failed")
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("serviceName", formData.serviceName)
    data.append("category", formData.category)
    data.append("price", formData.price)
    data.append("description", formData.description)
    if (formData.imageFile) data.append("imageFile", formData.imageFile)

    try {
      await ServiceAPI.create(data)
      fetchServices()
      handleCloseModal()
    } catch (err) {
      console.error(err)
      alert("Adding service failed")
    }
  }

  // Pagination calculations
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = filteredServices.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredServices.length / rowsPerPage)

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading services...</div>

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>Salon Services</h1>
      {error && <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>}

      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "12px" }}>
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            flex: 1,
            padding: "10px 12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button
          onClick={handleAddClick}
          style={{
            backgroundColor: "#8b5cf6",
            color: "white",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Add New Service
        </button>
      </div>

      {/* Services List */}
      <div style={{ width: "100%", borderCollapse: "collapse",background: "#fff", borderRadius: "10px" }}>
        <div style={{ background: "#8d73d6", color: "#fff", display: "flex", fontWeight: "bold", padding: "10px 0" }}>
          <div style={{ flex: 1,padding: "10px", border: "1px " }}>Name</div>
          <div style={{ flex: 1, padding: "10px", border: "1px " }}>Category</div>
          <div style={{ flex: 1, padding: "10px", border: "1px " }}>Image</div>
          <div style={{ flex: 1, padding: "10px", border: "1px " }}>Price</div>
          <div style={{ flex: 2, padding: "10px", border: "1px " }}>Description</div>
          <div style={{ width: "90px", padding: "10px", border: "1px " }}>Actions</div>
        </div>

        {currentRows.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {searchTerm ? "No services found matching your search." : "No services available."}
          </div>
        ) : (
          currentRows.map(srv => (
            <div key={srv.id} style={{ display: "flex", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #eee" }}>
              <div style={{ flex: 1 }}>{srv.serviceName || "N/A"}</div>
              <div style={{ flex: 1 }}>{srv.category || "N/A"}</div>
              <div style={{ flex: 1 }}>
                {srv.imageUrl ? <img src={`http://localhost:8080/api/v1.0/uploads/${srv.imageUrl}`} alt={srv.serviceName} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} /> : "No Image"}
              </div>
              <div style={{ flex: 1 }}>{srv.price || "N/A"}</div>
              <div style={{ flex: 2 }}>{srv.description || "N/A"}</div>
              <div style={{ width: "80px", display: "flex", gap: "8px" }}>
                <button onClick={() => handleEditClick(srv)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8b5cf6" }}>✏️</button>
                <button onClick={() => handleDelete(srv.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c53030" }}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "5px" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                backgroundColor: currentPage === page ? "#8b5cf6" : "#f3f4f6",
                color: currentPage === page ? "#fff" : "#374151",
                fontWeight: "600",
                transition: 'all 0.3s ease'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editService && (
        <ServiceModal
          title="Edit Service"
          formData={formData}
          setFormData={setFormData}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmit}
        />
      )}

      {/* Add Modal */}
      {addServiceModal && (
        <ServiceModal
          title="Add New Service"
          formData={formData}
          setFormData={setFormData}
          onClose={handleCloseModal}
          onSubmit={handleAddSubmit}
        />
      )}
    </div>
  )
}

// Modal Component
const ServiceModal = ({ title, formData, setFormData, onClose, onSubmit }) => {
  const handleFormChange = (e) => {
    const { name, value, files } = e.target
    setFormData({ ...formData, [name]: files ? files[0] : value })
  }

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center",
      zIndex: 1000
    }}>
      <form
        onSubmit={onSubmit}
        style={{
          background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #cbd5e0 100%)",
          padding: "30px", borderRadius: "16px",
          width: "400px", display: "flex", flexDirection: "column", gap: "12px"
        }}
      >
        <h2>{title}</h2>
        <input type="text" name="serviceName" placeholder="Service Name" value={formData.serviceName} onChange={handleFormChange} />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleFormChange} />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleFormChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleFormChange} />
        <input type="file" name="imageFile" onChange={handleFormChange} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
          <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#8b5cf6", color: "white", borderRadius: "12px", border: "none" }}>Save</button>
          <button type="button" onClick={onClose} style={{ padding: "8px 16px", backgroundColor: "#2d3748", color: "white", borderRadius: "12px", border: "none" }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ServicesContent

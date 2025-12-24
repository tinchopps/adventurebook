import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getPages, addPage, updatePage, deletePage, seedFirestore, deleteAllPages } from '../../services/pagesService';
import { seedPages } from '../../data/seedData';
import PageForm from './PageForm';
import Login from './Login';
import textures from '../../styles/textures.module.css';

/**
 * AdminPanel - Backoffice for managing book pages
 */
const AdminPanel = () => {
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const modalRef = useRef(null);

  // Load pages
  useEffect(() => {
    if (isAuthenticated) {
      loadPages();
    }
  }, [isAuthenticated]);

  const loadPages = async () => {
    try {
      const pagesData = await getPages();
      setPages(pagesData);
    } catch (error) {
      showMessage('error', 'Error al cargar las páginas');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleAddPage = async (pageData) => {
    try {
      await addPage(pageData);
      showMessage('success', '¡Página creada exitosamente!');
      setShowForm(false);
      loadPages();
    } catch (error) {
      showMessage('error', 'Error al crear la página');
    }
  };

  const handleUpdatePage = async (pageData) => {
    try {
      await updatePage(editingPage.id, pageData);
      showMessage('success', '¡Página actualizada!');
      setEditingPage(null);
      setShowModal(false);
      loadPages();
    } catch (error) {
      showMessage('error', 'Error al actualizar');
    }
  };

  // Open edit modal
  const handleEditClick = (page) => {
    setEditingPage(page);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingPage(null);
    document.body.style.overflow = 'unset';
  };

  // Handle escape key and click outside to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  const handleDeletePage = async (pageId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta página?')) return;
    
    try {
      await deletePage(pageId);
      showMessage('success', 'Página eliminada');
      loadPages();
    } catch (error) {
      showMessage('error', 'Error al eliminar');
    }
  };

  // Move page up (decrease order)
  const handleMoveUp = async (page) => {
    const sortedPages = [...pages].sort((a, b) => a.order - b.order);
    const currentIndex = sortedPages.findIndex(p => p.id === page.id);
    
    if (currentIndex <= 0) return; // Already at top
    
    const prevPage = sortedPages[currentIndex - 1];
    
    try {
      // Swap orders
      await updatePage(page.id, { order: prevPage.order });
      await updatePage(prevPage.id, { order: page.order });
      showMessage('success', 'Orden actualizado');
      loadPages();
    } catch (error) {
      showMessage('error', 'Error al mover página');
    }
  };

  // Move page down (increase order)
  const handleMoveDown = async (page) => {
    const sortedPages = [...pages].sort((a, b) => a.order - b.order);
    const currentIndex = sortedPages.findIndex(p => p.id === page.id);
    
    if (currentIndex >= sortedPages.length - 1) return; // Already at bottom
    
    const nextPage = sortedPages[currentIndex + 1];
    
    try {
      // Swap orders
      await updatePage(page.id, { order: nextPage.order });
      await updatePage(nextPage.id, { order: page.order });
      showMessage('success', 'Orden actualizado');
      loadPages();
    } catch (error) {
      showMessage('error', 'Error al mover página');
    }
  };

  const handleSeedFirestore = async () => {
    if (!window.confirm(`¿Subir ${seedPages.length} páginas a Firebase? Esto borrará las páginas actuales.`)) return;
    
    setSeeding(true);
    try {
      // First delete existing pages
      await deleteAllPages();
      // Then seed with new data
      await seedFirestore(seedPages);
      showMessage('success', `¡${seedPages.length} páginas subidas exitosamente!`);
      loadPages();
    } catch (error) {
      showMessage('error', 'Error al subir datos: ' + error.message);
    } finally {
      setSeeding(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Show login if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
        <div className="text-amber-100 font-handwriting text-xl">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const getLayoutLabel = (layout) => {
    const labels = {
      cover: '📕 Portada',
      photo_single: '📷 Foto',
      quote_center: '💬 Frase',
      checklist: '✅ Lista',
      collage: '🎨 Collage',
    };
    return labels[layout] || layout;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 p-2 sm:p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`
          ${textures.kraftPaper}
          rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 relative overflow-hidden
        `}>
          <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
          
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-caveat text-leather-burgundy">
                  📚 Admin
                </h1>
                <p className="font-handwriting text-xs sm:text-sm text-amber-800/70 truncate max-w-[150px] sm:max-w-none">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md bg-amber-200 hover:bg-amber-300
                  font-handwriting text-xs sm:text-sm text-amber-800 transition-colors"
              >
                Salir
              </button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleSeedFirestore}
                disabled={seeding}
                className={`
                  px-2 py-1.5 sm:px-3 sm:py-2 rounded-md bg-green-500 hover:bg-green-600
                  font-handwriting text-xs sm:text-sm text-white transition-colors flex-1 sm:flex-none
                  ${seeding ? 'opacity-50 cursor-wait' : ''}
                `}
              >
                {seeding ? '⏳...' : '🚀 Subir a Firebase'}
              </button>
              <a 
                href="/"
                className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md border-2 border-amber-400
                  font-handwriting text-xs sm:text-sm text-amber-800 hover:bg-amber-100
                  transition-colors inline-flex items-center justify-center gap-1 flex-1 sm:flex-none"
              >
                👁️ Ver libro
              </a>
            </div>
          </div>
        </div>

        {/* Message toast */}
        {message.text && (
          <div className={`
            mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg font-handwriting text-sm sm:text-base
            ${message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
            }
          `}>
            {message.text}
          </div>
        )}

        {/* Add new page button or form */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full mb-4 sm:mb-6 py-3 sm:py-4 rounded-lg border-2 border-dashed border-amber-400
              bg-amber-100/50 hover:bg-amber-100 text-amber-800
              font-caveat text-lg sm:text-xl transition-colors"
          >
            + Añadir página
          </button>
        )}

        {/* New page form */}
        {showForm && (
          <div className={`
            ${textures.kraftPaper}
            rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 relative overflow-hidden
          `}>
            <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-caveat text-leather-burgundy mb-4 sm:mb-6">
                Nueva página
              </h2>
              <PageForm 
                onSubmit={handleAddPage}
                onCancel={() => setShowForm(false)}
                existingPagesCount={pages.length}
                existingOrders={pages.map(p => p.order)}
              />
            </div>
          </div>
        )}

        {/* Pages list */}
        <div className={`
          ${textures.kraftPaper}
          rounded-lg p-3 sm:p-4 md:p-6 relative overflow-hidden
        `}>
          <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
          
          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-caveat text-leather-burgundy mb-4 sm:mb-6">
              Páginas ({pages.length})
            </h2>

            {loading ? (
              <div className="text-center py-8 font-handwriting text-amber-700">
                Cargando páginas...
              </div>
            ) : pages.length === 0 ? (
              <div className="text-center py-8 font-handwriting text-amber-700">
                No hay páginas todavía. ¡Crea la primera!
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {pages.sort((a, b) => a.order - b.order).map((page, index, sortedArr) => (
                  <div 
                    key={page.id}
                    className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-white/60 rounded-lg
                      hover:bg-white/80 transition-colors"
                  >
                    {/* Order controls */}
                    <div className="flex flex-col gap-0.5 flex-shrink-0">
                      <button
                        onClick={() => handleMoveUp(page)}
                        disabled={index === 0}
                        className={`
                          w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center
                          text-xs sm:text-sm transition-colors
                          ${index === 0 
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-700'}
                        `}
                        title="Mover arriba"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveDown(page)}
                        disabled={index === sortedArr.length - 1}
                        className={`
                          w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center
                          text-xs sm:text-sm transition-colors
                          ${index === sortedArr.length - 1 
                            ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-700'}
                        `}
                        title="Mover abajo"
                      >
                        ▼
                      </button>
                    </div>

                    {/* Order number */}
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-leather-burgundy/20 
                      flex items-center justify-center font-caveat text-xs sm:text-sm text-leather-burgundy flex-shrink-0">
                      {page.order}
                    </div>
                    
                    {/* Page info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-handwriting text-xs sm:text-sm text-amber-900">
                        {getLayoutLabel(page.layout)}
                      </div>
                      <div className="text-[10px] sm:text-xs text-amber-700/70 truncate font-handwriting">
                        {page.content?.substring(0, 25) || page.caption?.substring(0, 25) || 'Sin contenido'}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEditClick(page)}
                        className="p-1.5 sm:p-2 rounded bg-amber-200 hover:bg-amber-300
                          text-xs sm:text-sm transition-colors"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeletePage(page.id)}
                        className="p-1.5 sm:p-2 rounded bg-red-100 hover:bg-red-200
                          text-xs sm:text-sm transition-colors"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {showModal && editingPage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div 
              ref={modalRef}
              className={`
                ${textures.kraftPaper}
                rounded-lg p-4 sm:p-6 relative overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto
                animate-modal-in shadow-2xl
              `}
            >
              <div className={textures.agedPaper} style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />
              
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-red-100 
                  flex items-center justify-center shadow-md transition-colors"
              >
                <span className="text-lg">✕</span>
              </button>
              
              <div className="relative z-10">
                <h2 className="text-xl sm:text-2xl font-caveat text-leather-burgundy mb-4 sm:mb-6 flex items-center gap-2">
                  ✏️ Editando página #{editingPage.order}
                </h2>
                <PageForm 
                  page={editingPage}
                  onSubmit={handleUpdatePage}
                  onCancel={closeModal}
                  existingPagesCount={pages.length}
                  existingOrders={pages.map(p => p.order)}
                />
              </div>
            </div>
            
            {/* Modal animation styles */}
            <style>{`
              @keyframes modal-in {
                from {
                  opacity: 0;
                  transform: scale(0.95) translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: scale(1) translateY(0);
                }
              }
              .animate-modal-in {
                animation: modal-in 0.2s ease-out;
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

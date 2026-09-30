import React, { useState } from 'react';
import { ImagePlus, PackagePlus, Save, Trash2, X } from 'lucide-react';

const inputClass = 'w-full rounded-md border border-warmbrown-300 bg-white px-3 py-2 text-sm text-warmbrown-900 outline-none focus:border-terracotta-600 focus:ring-2 focus:ring-terracotta-200';
const labelClass = 'mb-1.5 block text-xs font-semibold text-warmbrown-700';

function createDraft(product = null) {
  return {
    name: product?.name || '',
    subtitle: product?.subtitle || '',
    price: product?.price ?? '',
    originalPrice: product?.originalPrice ?? '',
    inStock: product?.inStock ?? 1,
    tag: product?.tag || '',
    craftTime: product?.craftTime || '',
    image: product?.image || '',
    additionalImages: (product?.additionalImages || []).join('\n'),
    description: product?.description || '',
    details: (product?.details || []).join('\n')
  };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read that image.'));
    reader.readAsDataURL(file);
  });
}

async function prepareImage(file) {
  if (file.size > 12 * 1024 * 1024) {
    throw new Error('Choose an image smaller than 12 MB.');
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const compressed = await new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Could not process that image.')), 'image/jpeg', 0.78);
  });
  return fileToDataUrl(compressed);
}

function makeProductId(name) {
  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product';
  return `${slug}-${Date.now().toString(36)}`;
}

export default function AdminPage({ products, onSaveProduct, onDeleteProduct }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState(() => createDraft());
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const startNewProduct = () => {
    setEditingId(null);
    setDraft(createDraft());
    setMessage('');
    setError('');
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setDraft(createDraft(product));
    setMessage('');
    setError('');
  };

  const updateField = (event) => {
    setDraft(current => ({ ...current, [event.target.name]: event.target.value }));
    setMessage('');
    setError('');
  };

  const handleImageUpload = async (event, isGallery = false) => {
    const files = Array.from(event.target.files || []);
    event.target.value = '';
    if (!files.length) return;

    setError('');
    try {
      const images = await Promise.all(files.map(prepareImage));
      setDraft(current => isGallery
        ? { ...current, additionalImages: [...current.additionalImages.split('\n').filter(Boolean), ...images].join('\n') }
        : { ...current, image: images[0] });
      setMessage('');
    } catch (uploadError) {
      setError(uploadError.message || 'Could not upload that image.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    const existingProduct = products.find(product => product.id === editingId);
    const product = {
      ...existingProduct,
      id: editingId || makeProductId(draft.name),
      name: draft.name.trim(),
      subtitle: draft.subtitle.trim(),
      price: Number(draft.price),
      originalPrice: draft.originalPrice ? Number(draft.originalPrice) : null,
      inStock: Number(draft.inStock),
      tag: draft.tag.trim(),
      craftTime: draft.craftTime.trim(),
      image: draft.image.trim(),
      additionalImages: draft.additionalImages.split('\n').map(image => image.trim()).filter(Boolean),
      description: draft.description.trim(),
      details: draft.details.split('\n').map(detail => detail.trim()).filter(Boolean),
      rating: existingProduct?.rating ?? 5,
      reviewsCount: existingProduct?.reviewsCount ?? 0
    };
    const result = onSaveProduct(product);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setEditingId(product.id);
    setDraft(createDraft(product));
    setMessage('Product saved. The storefront is updated.');
  };

  const removeProduct = (product) => {
    if (!window.confirm(`Delete "${product.name}" from the shop?`)) return;
    const result = onDeleteProduct(product.id);
    if (!result.success) {
      setError(result.error);
      return;
    }
    if (editingId === product.id) startNewProduct();
    setMessage(`${product.name} was removed from the shop.`);
    setError('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
      <div className="mb-8 flex flex-col gap-4 border-b border-warmbrown-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-terracotta-700">Shop workspace</p>
          <h1 className="font-serif text-3xl font-bold text-warmbrown-900">Product manager</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-warmbrown-700">
            Update the collection, prices, stock, descriptions, and product photos.
          </p>
        </div>
        <button
          type="button"
          onClick={startNewProduct}
          className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-terracotta-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-800 sm:self-auto"
        >
          <PackagePlus className="h-4 w-4" /> Add product
        </button>
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.85fr)]">
        <section className="min-w-0">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-warmbrown-900">
                {editingId ? 'Edit listing' : 'New listing'}
              </h2>
              <p className="mt-1 text-xs text-warmbrown-600">Fields marked * are required.</p>
            </div>
            {editingId && (
              <button type="button" onClick={startNewProduct} className="inline-flex items-center gap-1 text-xs font-medium text-warmbrown-600 hover:text-terracotta-700">
                <X className="h-4 w-4" /> Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className={labelClass}>Product name *</span>
                <input className={inputClass} name="name" value={draft.name} onChange={updateField} required maxLength={90} />
              </label>
              <label>
                <span className={labelClass}>Subtitle</span>
                <input className={inputClass} name="subtitle" value={draft.subtitle} onChange={updateField} maxLength={100} />
              </label>
              <label>
                <span className={labelClass}>Price (₹) *</span>
                <input className={inputClass} type="number" name="price" value={draft.price} onChange={updateField} min="1" step="1" required />
              </label>
              <label>
                <span className={labelClass}>Original price (₹)</span>
                <input className={inputClass} type="number" name="originalPrice" value={draft.originalPrice} onChange={updateField} min="0" step="1" />
              </label>
              <label>
                <span className={labelClass}>Stock quantity *</span>
                <input className={inputClass} type="number" name="inStock" value={draft.inStock} onChange={updateField} min="0" step="1" required />
              </label>
              <label>
                <span className={labelClass}>Badge</span>
                <input className={inputClass} name="tag" value={draft.tag} onChange={updateField} placeholder="e.g. New arrival" maxLength={32} />
              </label>
              <label className="sm:col-span-2">
                <span className={labelClass}>Crafting time</span>
                <input className={inputClass} name="craftTime" value={draft.craftTime} onChange={updateField} placeholder="e.g. 12 hours of hand needlework" maxLength={80} />
              </label>
            </div>

            <label className="block">
              <span className={labelClass}>Main photo URL *</span>
              <input className={inputClass} type="url" name="image" value={draft.image} onChange={updateField} placeholder="https://... or upload a photo below" required />
            </label>
            <label className="block">
              <span className={labelClass}>Upload main photo</span>
              <span className="flex flex-wrap items-center gap-3">
                <input className="block w-full max-w-md text-xs text-warmbrown-700 file:mr-3 file:rounded-md file:border-0 file:bg-terracotta-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-terracotta-900 hover:file:bg-terracotta-200" type="file" accept="image/*" onChange={event => handleImageUpload(event)} />
                <span className="text-xs text-warmbrown-500">Resized for browser storage</span>
              </span>
            </label>
            {draft.image && (
              <img src={draft.image} alt="Main product preview" className="h-36 w-36 rounded-md border border-warmbrown-200 bg-cream-100 object-cover" />
            )}

            <label className="block">
              <span className={labelClass}>Additional photo URLs</span>
              <textarea className={inputClass} name="additionalImages" value={draft.additionalImages} onChange={updateField} rows="3" placeholder="Add one image URL per line" />
            </label>
            <label className="block">
              <span className={labelClass}>Upload additional photos</span>
              <span className="flex items-center gap-3">
                <ImagePlus className="h-4 w-4 shrink-0 text-terracotta-700" />
                <input className="block w-full text-xs text-warmbrown-700 file:mr-3 file:rounded-md file:border-0 file:bg-terracotta-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-terracotta-900 hover:file:bg-terracotta-200" type="file" accept="image/*" multiple onChange={event => handleImageUpload(event, true)} />
              </span>
            </label>

            <label className="block">
              <span className={labelClass}>Description *</span>
              <textarea className={inputClass} name="description" value={draft.description} onChange={updateField} rows="4" required maxLength={1200} />
            </label>
            <label className="block">
              <span className={labelClass}>Product details</span>
              <textarea className={inputClass} name="details" value={draft.details} onChange={updateField} rows="4" placeholder="One detail per line" />
            </label>

            {error && <p role="alert" className="text-sm font-medium text-red-700">{error}</p>}
            {message && <p role="status" className="text-sm font-medium text-emerald-800">{message}</p>}
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md bg-terracotta-700 px-5 py-3 text-sm font-semibold text-white hover:bg-terracotta-800">
              <Save className="h-4 w-4" /> Save listing
            </button>
          </form>
        </section>

        <aside className="border-t border-warmbrown-300 pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-serif text-xl font-bold text-warmbrown-900">Shop listings</h2>
            <span className="text-xs text-warmbrown-600">{products.length} items</span>
          </div>
          {products.length === 0 ? (
            <p className="py-8 text-sm text-warmbrown-600">No products yet. Add your first listing to get started.</p>
          ) : (
            <ul className="divide-y divide-warmbrown-200">
              {products.map(product => (
                <li key={product.id} className={`flex items-center gap-3 py-3 ${editingId === product.id ? 'bg-terracotta-50' : ''}`}>
                  <button type="button" onClick={() => editProduct(product)} className="flex min-w-0 flex-1 items-center gap-3 rounded-sm text-left hover:text-terracotta-800">
                    <img src={product.image} alt="" className="h-14 w-14 shrink-0 rounded-sm border border-warmbrown-200 bg-cream-100 object-cover" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-warmbrown-900">{product.name}</span>
                      <span className="mt-1 block text-xs text-warmbrown-600">₹{Number(product.price).toLocaleString('en-IN')} · {product.inStock} in stock</span>
                      <span className="mt-1 block text-[11px] text-terracotta-700">Edit listing</span>
                    </span>
                  </button>
                  <button type="button" onClick={() => removeProduct(product)} className="rounded-sm p-2 text-warmbrown-500 hover:bg-red-50 hover:text-red-700" aria-label={`Delete ${product.name}`} title="Delete product">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-6 border-t border-warmbrown-200 pt-4 text-xs leading-relaxed text-warmbrown-600">
            Changes are saved only in this browser on this device. This manager is not password-protected, and it does not publish to a hosted shop.
          </p>
        </aside>
      </div>
    </div>
  );
}
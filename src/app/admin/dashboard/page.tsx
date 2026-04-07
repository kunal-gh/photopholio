"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { Camera, Upload, Trash2, LogOut, Image as ImageIcon, Star, CheckCircle, XCircle, Calendar, FolderOpen, Plus, Pencil, Check, X, GripVertical, Archive } from "lucide-react";
import { IKUpload } from "imagekitio-next";

interface Photo {
  id: string;
  title: string;
  description?: string;
  section: string;
  imageUrl: string;
  imageKitFileId: string;
  featured: boolean;
  uploadedAt: string;
  eventDate?: string;
  tags?: string;
}

interface Section {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  photoCount?: number;
}

type Tab = "gallery" | "sections";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState("all");
  const [activeTab, setActiveTab] = useState<Tab>("gallery");
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState({ title: "", description: "", section: "", tags: "", eventDate: "", featured: false });
  const ikUploadRef = useRef<any>(null);

  // Section editing state
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionDesc, setNewSectionDesc] = useState("");
  const [addingSection, setAddingSection] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => { if (status === "unauthenticated") router.push("/admin/login"); }, [status, router]);
  useEffect(() => { fetchSections(); }, []);
  useEffect(() => { fetchPhotos(); }, [activeSection]);

  const fetchSections = async () => {
    const res = await fetch("/api/sections");
    const data = await res.json();
    if (Array.isArray(data)) {
      setSections(data);
      // Set default form section to first available
      if (data.length > 0) setForm(f => ({ ...f, section: f.section || data[0].name }));
    }
  };

  const fetchPhotos = async () => {
    const url = activeSection === "all" ? "/api/photographs" : `/api/photographs?section=${encodeURIComponent(activeSection)}`;
    const res = await fetch(url);
    const data = await res.json();
    setPhotos(Array.isArray(data) ? data : []);
  };

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getIKAuth = async () => {
    const res = await fetch("/api/imagekit/auth");
    return res.json();
  };

  const onUploadSuccess = async (res: any) => {
    const response = await fetch("/api/photographs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title, description: form.description, section: form.section,
        imageUrl: res.url, imageKitFileId: res.fileId,
        width: res.width, height: res.height,
        featured: form.featured, tags: form.tags,
        eventDate: form.eventDate || null,
      }),
    });
    if (response.ok) {
      showToast("Photo uploaded successfully!", "success");
      setForm(f => ({ ...f, title: "", description: "", tags: "", eventDate: "", featured: false }));
      fetchPhotos();
      fetchSections();
    } else {
      showToast("Upload failed. Try again.", "error");
    }
    setUploading(false);
  };

  const deletePhoto = async (id: string) => {
    if (!confirm("Delete this photo permanently?")) return;
    await fetch(`/api/photographs/${id}`, { method: "DELETE" });
    showToast("Photo deleted.", "success");
    fetchPhotos(); fetchSections();
  };

  const toggleFeatured = async (photo: Photo) => {
    await fetch(`/api/photographs/${photo.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !photo.featured }),
    });
    fetchPhotos();
  };

  const createSection = async () => {
    if (!newSectionName.trim()) return showToast("Enter a section name.", "error");
    const res = await fetch("/api/sections", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSectionName.trim(), description: newSectionDesc.trim() }),
    });
    if (res.ok) {
      showToast("Section created!", "success");
      setNewSectionName(""); setNewSectionDesc(""); setAddingSection(false);
      fetchSections();
    } else {
      const err = await res.json();
      showToast(err.error || "Failed to create section.", "error");
    }
  };

  const startEdit = (section: Section) => {
    setEditingId(section.id);
    setEditName(section.name);
    setEditDesc(section.description || "");
  };

  const saveEdit = async (id: string) => {
    const res = await fetch(`/api/sections/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, description: editDesc }),
    });
    if (res.ok) {
      showToast("Section renamed — photos updated!", "success");
      setEditingId(null);
      fetchSections(); fetchPhotos();
    } else {
      const err = await res.json();
      showToast(err.error || "Failed to rename.", "error");
    }
  };

  const deleteSection = async (section: Section) => {
    if (!confirm(`Delete "${section.name}"? Its ${section.photoCount ?? 0} photos will be moved to Archive.`)) return;
    const res = await fetch(`/api/sections/${section.id}`, { method: "DELETE" });
    if (res.ok) {
      showToast(`"${section.name}" deleted. Photos archived.`, "success");
      fetchSections(); fetchPhotos();
    } else {
      showToast("Failed to delete section.", "error");
    }
  };

  if (status === "loading") return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );

  const displaySections = sections.filter(s => s.slug !== "archived");
  const archivedSection = sections.find(s => s.slug === "archived");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium transition-all ${toast.type === "success" ? "bg-green-500/20 border border-green-500/30 text-green-300" : "bg-red-500/20 border border-red-500/30 text-red-300"}`}>
          {toast.type === "success" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between backdrop-blur-xl sticky top-0 z-40 bg-[#0a0a0a]/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Camera className="w-4 h-4 text-white/80" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">Studio Admin</h1>
            <p className="text-xs text-white/40">Photo Management Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Tab switcher */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button onClick={() => setActiveTab("gallery")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "gallery" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}>
              <ImageIcon className="w-3.5 h-3.5" /> Gallery
            </button>
            <button onClick={() => setActiveTab("sections")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTab === "sections" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}>
              <FolderOpen className="w-3.5 h-3.5" /> Sections
            </button>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* ── GALLERY TAB ── */}
      {activeTab === "gallery" && (
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[380px,1fr] gap-8">
          {/* Upload Panel */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Upload className="w-4 h-4 text-white/60" />
                <h2 className="text-sm font-semibold text-white">Upload New Photo</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Photo title" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all" />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Section *</label>
                  {sections.filter(s => s.slug !== "archived").length === 0 ? (
                    <p className="text-xs text-white/30 italic">No sections yet. Create one in the Sections tab.</p>
                  ) : (
                    <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all">
                      {sections.filter(s => s.slug !== "archived").map(s => <option key={s.id} value={s.name} className="bg-[#1a1a1a]">{s.name}</option>)}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional description..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all resize-none" />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Tags</label>
                  <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="nature, golden-hour, couple" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all" />
                </div>

                <div>
                  <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Event Date</label>
                  <input type="date" value={form.eventDate} onChange={e => setForm(f => ({ ...f, eventDate: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all [color-scheme:dark]" />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4 rounded border-white/20 bg-white/5 accent-white" />
                  <span className="text-sm text-white/60">Mark as Featured</span>
                </label>

                <div className="hidden">
                  <IKUpload ref={ikUploadRef} fileName={`photo-${Date.now()}`} folder="/studio"
                    useUniqueFileName={true} onSuccess={onUploadSuccess}
                    onError={() => { showToast("Upload error. Try again.", "error"); setUploading(false); }}
                    onUploadStart={() => setUploading(true)} authenticator={getIKAuth} />
                </div>

                <button onClick={() => {
                  if (!form.title) return showToast("Please enter a title.", "error");
                  if (!form.section) return showToast("Please select a section.", "error");
                  ikUploadRef.current?.click();
                }} disabled={uploading} className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl text-sm hover:bg-white/90 transition-all disabled:opacity-50">
                  {uploading ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Choose & Upload Photo</>}
                </button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-white/40 space-y-1.5">
              <p className="font-medium text-white/60 mb-2">Upload Notes</p>
              <p>• High-res images are preserved at full quality</p>
              <p>• Images stored securely on ImageKit CDN</p>
              <p>• Each photo is labelled by section automatically</p>
            </div>
          </div>

          {/* Gallery Panel */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-white/60" />
                <h2 className="text-sm font-semibold text-white">Gallery</h2>
                <span className="text-xs text-white/30 ml-1">({photos.length} photos)</span>
              </div>
            </div>

            {/* Section Filter */}
            <div className="flex flex-wrap gap-2 mb-5">
              {["all", ...sections.map(s => s.name)].map(s => (
                <button key={s} onClick={() => setActiveSection(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${activeSection === s ? "bg-white text-black" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"}`}>
                  {s === "archived" && <Archive className="w-3 h-3" />}
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>

            {photos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-60 text-white/20">
                <Camera className="w-12 h-12 mb-3" />
                <p className="text-sm">No photos yet. Upload your first one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {photos.map(photo => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 aspect-square">
                    <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                      <div className="flex justify-between">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg w-fit">{photo.section}</span>
                          {photo.uploadedAt && <span className="text-[10px] text-white/50 flex items-center gap-1"><Calendar className="w-2.5 h-2.5" />{new Date(photo.uploadedAt).toLocaleDateString()}</span>}
                        </div>
                        <button onClick={() => toggleFeatured(photo)} className={`p-1 rounded-lg ${photo.featured ? "text-yellow-400" : "text-white/30 hover:text-yellow-400"}`} title="Toggle featured">
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white truncate">{photo.title}</p>
                        <button onClick={() => deletePhoto(photo.id)} className="mt-1 flex items-center gap-1 text-red-400 text-xs hover:text-red-300 transition-colors">
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                    {photo.featured && <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-yellow-400" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SECTIONS TAB ── */}
      {activeTab === "sections" && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Manage Sections</h2>
              <p className="text-xs text-white/40 mt-1">Sections appear as cards on the public portfolio page.</p>
            </div>
            <button onClick={() => setAddingSection(true)} className="flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-xl hover:bg-white/90 transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Section
            </button>
          </div>

          {/* Add Section Form */}
          {addingSection && (
            <div className="bg-white/5 border border-white/20 rounded-2xl p-4 mb-4 space-y-3">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">New Section</p>
              <input autoFocus value={newSectionName} onChange={e => setNewSectionName(e.target.value)} placeholder="Section name (e.g. Architecture)" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all" />
              <input value={newSectionDesc} onChange={e => setNewSectionDesc(e.target.value)} placeholder="Short description (optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all" />
              <div className="flex gap-2">
                <button onClick={createSection} className="flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-4 py-2 rounded-xl hover:bg-white/90 transition-all">
                  <Check className="w-3.5 h-3.5" /> Create
                </button>
                <button onClick={() => { setAddingSection(false); setNewSectionName(""); setNewSectionDesc(""); }} className="flex items-center gap-1.5 bg-white/10 text-white/60 text-xs font-medium px-4 py-2 rounded-xl hover:bg-white/20 transition-all">
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
              </div>
            </div>
          )}

          {/* Sections List */}
          {displaySections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-white/20">
              <FolderOpen className="w-12 h-12 mb-3" />
              <p className="text-sm">No sections yet. Add your first one!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {displaySections.map(section => (
                <div key={section.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 group">
                  {editingId === section.id ? (
                    <div className="space-y-2">
                      <input autoFocus value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-white/5 border border-white/20 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/40 transition-all" />
                      <input value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description (optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-all" />
                      <div className="flex gap-2">
                        <button onClick={() => saveEdit(section.id)} className="flex items-center gap-1.5 bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-white/90 transition-all">
                          <Check className="w-3.5 h-3.5" /> Save
                        </button>
                        <button onClick={() => setEditingId(null)} className="flex items-center gap-1.5 bg-white/10 text-white/60 text-xs px-3 py-1.5 rounded-lg hover:bg-white/20 transition-all">
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-white/20" />
                        <div>
                          <p className="text-sm font-medium text-white">{section.name}</p>
                          {section.description && <p className="text-xs text-white/40 mt-0.5">{section.description}</p>}
                          <p className="text-xs text-white/25 mt-0.5">{section.photoCount ?? 0} photo{section.photoCount !== 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => startEdit(section)} className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all" title="Rename">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteSection(section)} className="p-2 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Delete (photos will be archived)">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Archived section indicator */}
          {archivedSection && archivedSection.photoCount && archivedSection.photoCount > 0 && (
            <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-3">
              <Archive className="w-5 h-5 text-yellow-400/60 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-300/80 font-medium">Archive</p>
                <p className="text-xs text-yellow-400/50">{archivedSection.photoCount} photo{archivedSection.photoCount !== 1 ? "s" : ""} from deleted sections. View them in the Gallery tab.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
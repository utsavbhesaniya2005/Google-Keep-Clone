import './Dashboard.css';
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { addNotesAsync, deleteNotesAsync, findNoteAsync, getNotesAsync, updateNoteAsync } from '../services/actions/note.action';
import { useNavigate } from 'react-router';

const Dashboard = () => {

    const { notes, note } = useSelector(state => state.NoteReducer);
    const { isSignIn } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isAddingNote, setIsAddingNote] = useState(false);

    const [newNote, setNewNote] = useState({
        id : '',
        title: '',
        desc: '',
        tag : 'Professional',
        bgColor : ''
    });

    const [editNote, setEditNote] = useState({
        id : '',
        title: '',
        desc: '',
        tag : 'Professional',
        bgColor : ''
    });

    const getBgColor = (tag) => {
        switch(tag)
        {
        
            case 'Professional':
                return '#007bff';

            case 'Growth & Health':
                return '#28a745'; 

            case 'Fun & Adventure':
                return '#ffc107'; 

            case 'Personal/Creative':
                return '#6f42c1'; 

            case 'Energy & Urgency':
                return '#dc3545'; 

            case 'Neutral':
                return '#6c757d'; 

            case 'Other':
                return '#d88b6d'; 

            default:
                return '#ffffff'; 
        }
    };

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const handleInput = (e) => {
        
        setNewNote({ ...newNote, [e.target.name] : e.target.value });
    };

    const handleEditInput = (e) => {
        
        setEditNote({ ...editNote, [e.target.name] : e.target.value });
    };

    const handleSubmit = () => {

        event.preventDefault();

        if(!newNote.bgColor){
            newNote.bgColor = getBgColor(newNote.tag)
        }

        console.log(newNote);

        dispatch(addNotesAsync(newNote));
        setIsAddingNote(false);

        setNewNote({ title : '' , desc : '' , tag : 'Professional' , bgColor : '' })
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleUpdatedNote = () => {

        if(editNote.bgColor){
            editNote.bgColor = getBgColor(editNote.tag);
        }

        dispatch(updateNoteAsync(editNote));
        setIsAddingNote(false);
    }

    const handleEdit = (id) => {

        setIsAddingNote(true);
        dispatch(findNoteAsync(id));
    }

    const handelDelete = (id) => {
        
        dispatch(deleteNotesAsync(id))
    }

    useEffect(() => {
        if(note){
            setEditNote({
                id : note.id,
                title : note.title,
                desc : note.desc,
                tag : note.tag,
                bgColor : note.bgColor
            });
        }
    }, [note]);

    useEffect(() => {
        dispatch(getNotesAsync())
    }, [dispatch, newNote]);

    useEffect(() => {
        if(editNote.id){
            dispatch(getNotesAsync())
        }
    }, [dispatch, editNote.id, handleUpdatedNote]);

    useEffect(() => {
        if(!isSignIn){
            navigate('signIn')
        }
    }, [isSignIn]);

    return (
        <>
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={collapsed} />
            <div className={`dashbaord-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
                <div className={`dashboard `}>
                    <div className="container">
                        <div className="row gap-y-8">
                            {!isAddingNote && (
                                <div className="col-3">
                                    <div className="add-note drop-shadow-lg" onClick={() => setIsAddingNote(true)}>
                                        <span>Add Note</span>
                                    </div>
                                </div>
                            )}

                            {
                                note 
                                ? 
                                <div className="col-3">
                                    <div className="note" style={{ backgroundColor: editNote.backgroundColor }} >
                                        <input type="text" name="title" placeholder="Enter title" value={editNote.title} onChange={handleEditInput} />
                                        <textarea name="desc" placeholder="Enter description" value={editNote.desc} onChange={handleEditInput} />
                                        <label htmlFor="tag">Tag :</label>
                                        <div className="select-wrapper">
                                            <select name="tag" id="tag" value={editNote.tag} onChange={handleEditInput} >
                                                <option value="Professional">Professional</option>
                                                <option value="Growth & Health">Growth & Health</option>
                                                <option value="Fun & Adventure">Fun & Adventure</option>
                                                <option value="Personal/Creative">Personal/Creative</option>
                                                <option value="Energy & Urgency">Energy & Urgency</option>
                                                <option value="Neutral">Neutral</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="actions">
                                            <button onClick={handleUpdatedNote}>Update</button>
                                            <button onClick={() => setIsAddingNote(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                isAddingNote && (
                                    <div className="col-3">
                                        <div className="note" style={{ backgroundColor: newNote.backgroundColor }} >
                                            <input type="text" name="title" placeholder="Enter title" value={newNote.title} onChange={handleInput} />
                                            <textarea name="desc" placeholder="Enter description" value={newNote.desc} onChange={handleInput} />
                                            <label htmlFor="tag">Tag :</label>
                                            <div className="select-wrapper">
                                                <select name="tag" id="tag" value={newNote.tag} onChange={handleInput} >
                                                    <option value="Professional">Professional</option>
                                                    <option value="Growth & Health">Growth & Health</option>
                                                    <option value="Fun & Adventure">Fun & Adventure</option>
                                                    <option value="Personal/Creative">Personal/Creative</option>
                                                    <option value="Energy & Urgency">Energy & Urgency</option>
                                                    <option value="Neutral">Neutral</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="actions">
                                                <button onClick={handleSubmit}>Save</button>
                                                <button onClick={() => setIsAddingNote(false)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {   
                                notes.map((note, index) => (
                                    <div className="col-3" key={index}>
                                        <div className={`note`} style={{backgroundColor : note.bgColor}}>
                                            <div className="note-header">
                                                <h6 className='text-white'>{note.createAt}</h6>
                                                <h2>{note.title}</h2>
                                                <p className='text-white'>{note.desc}</p>
                                            </div>
                                            <p>{note.description}</p>
                                            <div className="tags">
                                                {note.tag && <span className="tag">{note.tag}</span>}
                                            </div>
                                            <div className="actions">
                                                <button className="edit-button" onClick={() => handleEdit(note.id)}>Edit</button>
                                                <button className="delete-button" onClick={() => handelDelete(note.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
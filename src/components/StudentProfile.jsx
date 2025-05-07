export default function StudentProfile({ user, onProfileUpdate }) {
    return (
      <ProfileEditor user={user} onSave={onProfileUpdate}>
        {(editedUser, setEditedUser) => (
          <>
            <div className="form-group">
              <label>College</label>
              <input
                value={editedUser.college || ''}
                onChange={e => setEditedUser({...editedUser, college: e.target.value})}
              />
            </div>
  
            <div className="form-group">
              <label>Semester</label>
              <input
                type="number"
                value={editedUser.semester || ''}
                onChange={e => setEditedUser({...editedUser, semester: e.target.value})}
                min="1"
                max="8"
              />
            </div>
          </>
        )}
      </ProfileEditor>
    );
  }
  
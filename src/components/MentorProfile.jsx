export default function MentorProfile({ user, onProfileUpdate }) {
    return (
      <ProfileEditor user={user} onSave={onProfileUpdate}>
        {(editedUser, setEditedUser) => (
          <>
            <div className="form-group">
              <label>Expertise</label>
              <input
                value={editedUser.expertise || ''}
                onChange={e => setEditedUser({...editedUser, expertise: e.target.value})}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Office Hours</label>
              <input
                value={editedUser.officeHours || ''}
                onChange={e => setEditedUser({...editedUser, officeHours: e.target.value})}
                placeholder="e.g., Mon-Fri 2-4 PM"
              />
            </div>
          </>
        )}
      </ProfileEditor>
    );
  }
  
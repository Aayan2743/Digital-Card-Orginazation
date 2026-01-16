export default function CardEditor({ profile, setProfile }) {
  return (
    <div className="card p-6">
      {Object.keys(profile).map((key) =>
        typeof profile[key] === "string" ? (
          <input
            key={key}
            className="input"
            value={profile[key]}
            onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
            placeholder={key}
          />
        ) : null
      )}
    </div>
  );
}

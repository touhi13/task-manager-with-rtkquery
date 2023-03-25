import ferdous from '../../assets/images/avatars/ferdous.png';
import akash from '../../assets/images/avatars/akash.png';
import almas from '../../assets/images/avatars/almas.png';
import riyadh from '../../assets/images/avatars/riyadh.png';
import sadh from '../../assets/images/avatars/sadh.png';
import salahuddin from '../../assets/images/avatars/salahuddin.png';
import sumit from '../../assets/images/avatars/sumit.png';

const avatarMap = {
  '/images/avatars/ferdous.png': ferdous,
  '/images/avatars/akash.png': akash,
  '/images/avatars/almas.png': almas,
  '/images/avatars/riyadh.png': riyadh,
  '/images/avatars/sadh.png': sadh,
  '/images/avatars/salahuddin.png': salahuddin,
  '/images/avatars/sumit.png': sumit,
};

export default function Member({ member }) {
  const { name, avatar } = member;

  const matchedAvatar = avatarMap[avatar] || undefined;

  return (
    <div className="checkbox-container">
      <img src={matchedAvatar} className="team-avater" alt="avatar" />
      <p className="label">{name}</p>
    </div>
  );
}

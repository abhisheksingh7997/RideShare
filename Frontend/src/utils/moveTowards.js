export default function  moveTowards(current, target, step = 0.0005) {
  const latDiff = target.lat - current.lat;
  const lngDiff = target.lng - current.lng;

  const distance = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

  if (distance < step) return target;

  return {
    lat: current.lat + (latDiff / distance) * step,
    lng: current.lng + (lngDiff / distance) * step,
  };
}


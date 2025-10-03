export function BadgeList({items}: {items: string[]}) {
  if (!items || items.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((badge) => (
        <span key={badge} className="badge-soft">
          {badge}
        </span>
      ))}
    </div>
  )
}

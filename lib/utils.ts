export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ');
}

export function formatPhone(phone: string) {
  return phone.replace(/[^+\d]/g, '');
}

export function obfuscate(value: string) {
  if (!value) return '';
  return value.replace(/.(?=.{2})/g, '•');
}

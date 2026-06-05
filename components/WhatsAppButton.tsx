import { MessageCircleMore } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801876882474"
      target="_blank"
      className="fixed bottom-28 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition active:scale-95"
    >
      <MessageCircleMore size={30} />
    </a>
  );
}

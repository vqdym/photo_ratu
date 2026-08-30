interface NoDataMessageProps {
  message?: string;
}

export default function NoDataMessage({
  message = "Немає даних",
}: NoDataMessageProps) {
  return (
    <div className="flex w-full items-center justify-center py-12">
      <p className="px-5 py-3 text-base font-medium text-espresso-800 md:text-lg">
        {message}
      </p>
    </div>
  );
}

import { Button } from "@/components/atoms/button/button";
import { usePageReturn } from "@/hooks/use-page-return";
import { IconEnum } from "@/enums/icon-enum";

export default function NotFoundPage() {
  const goBack = usePageReturn();

  return (
    <>
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div
          style={{
            background:
              "radial-gradient(50% 109137.91% at 50% 50%, rgba(233, 30, 99, 0.1) 0%, rgba(254, 244, 247, 0) 100%)",
          }}
          className="text-center"
        >
          <span className="bg-white text-pink-500 font-bold text-2xl inline-block px-3">
            404
          </span>
        </div>
        <div className="mt-6 mb-5 font-bold text-6xl text-900 text-center">
          Página não encontrada
        </div>
        <p className="text-700 text-3xl mt-0 mb-6 text-center">
          Desculpe, essa página não existe.
        </p>
        <div className="text-center">
          <Button
            label="Voltar"
            icon={IconEnum.arrow_left}
            onClick={() => goBack()}
          />
        </div>
      </div>
    </>
  );
}

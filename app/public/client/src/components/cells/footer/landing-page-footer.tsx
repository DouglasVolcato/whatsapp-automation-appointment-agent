import { Anchor } from "@/components/atoms/anchor/anchor";

export function LandingPageFooter() {
  return (
    <div className="bg-gray-900 px-4 py-8 md:px-6 lg:px-8">
      <div className="bg-gray-900">
        <div className="grid">
          <div className="col-3"></div>
          <div className="col-12 md:col-4 text-gray-200">
            <div className="text-white font-bold line-height-3 mb-3">
              Desenvolvedor
            </div>
            <div className="text-white line-height-3 block mb-2">
              Douglas Volcato
            </div>
            <div className="text-white line-height-3 block mb-2">
              <i className="pi pi-phone border-round p-1 mr-2"></i>
              +55 (51) 99977-2868
            </div>
            <div className="text-white line-height-3 block mb-2 flex">
              <i className="pi pi-inbox border-round p-1 mr-2"></i>
              douglasvolcato@gmail.com
            </div>
          </div>
          <div className="col-12 md:col-4 text-gray-200">
            <div className="text-white font-bold line-height-3 mb-3">
              Redes Sociais
            </div>
            <Anchor
              className="text-white line-height-3 block cursor-pointer mb-2"
              href="https://github.com/DouglasVolcato"
              targetBlank
            >
              <i className="pi pi-github border-round p-1 mr-2"></i>
              GitHub
            </Anchor>
            <Anchor
              className="text-white line-height-3 block cursor-pointer mb-2"
              href="https://www.linkedin.com/in/douglasvolcato/"
              targetBlank
            >
              <i className="pi pi-linkedin border-round p-1 mr-2"></i>
              LinkedIn
            </Anchor>
            <Anchor
              className="text-white line-height-3 block cursor-pointer mb-2"
              href="https://www.instagram.com/douglasvolcato/"
              targetBlank
            >
              <i className="pi pi-instagram border-round p-1 mr-2"></i>
              Instagram
            </Anchor>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
}

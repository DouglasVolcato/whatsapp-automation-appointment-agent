import { RemoveUserPreferencesUseCase } from "../../domain/usecases/users/remove-user-preferences-usecase";
import { GetUserPreferencesUseCase } from "../../domain/usecases/users/get-user-preferences-usecase";
import { SearchPropertiesUseCase } from "../../domain/usecases/properties/search-properties-usecase";
import { UserPreferenceEntity } from "../../domain/abstract/entities/user-preference-entity";
import { PropertyEntity } from "../../domain/abstract/entities/property-entity";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

type PreferenceIndexType = 'country' | 'state' | 'city' | 'neighborhood' | 'bathrooms' | 'bedrooms' | 'parking_spaces' | 'price_from' | 'price_to' | 'size'

export class RemoveUserPreferencesTool extends LlmTool {
  private readonly removeUserPreferences: RemoveUserPreferencesUseCase.Service;
  private readonly getUserPreferences: GetUserPreferencesUseCase.Service;
  private readonly searchProperties: SearchPropertiesUseCase.Service;

  private readonly preferences = {
    'country': 'país',
    'state': 'estado',
    'city': 'cidade',
    'neighborhood': 'bairro',
    'bathrooms': 'banheiros',
    'bedrooms': 'quartos',
    'parking_spaces': 'vagas de estacionamento',
    'price_from': 'preço mínimo de',
    'price_to': 'preço máximo de',
    'size': 'tamanho',
    'property_type': 'tipo de imóvel',
    'condition_type': 'condição',
  }

  public constructor() {
    super();
    this.removeUserPreferences = new RemoveUserPreferencesUseCase.Service();
    this.getUserPreferences = new GetUserPreferencesUseCase.Service();
    this.searchProperties = new SearchPropertiesUseCase.Service();
  }

  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "atualizar-preferencias",
      schema: z.object({
        user_id: z.string(),
        country: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        neighborhood: z.string().optional(),
        bathrooms: z.string().optional(),
        bedrooms: z.string().optional(),
        parking_spaces: z.string().optional(),
        price_from: z.string().optional(),
        price_to: z.string().optional(),
        size: z.string().optional(),
        property_type: z.string().optional(),
        condition_type: z.string().optional(),
      }),
      description: `Remove as preferências do usuário relacionadas a propriedades. Passe apenas as preferências que deseja remover como parâmetros.`,
    };
  }

  private async execute(
    input: typeof RemoveUserPreferencesUseCase.Input
  ): Promise<string> {
    await this.removeUserPreferences.execute(input);
    const preferences: UserPreferenceEntity =
      await this.getUserPreferences.execute({
        user_id: input.user_id,
      });

    const filledPreferences: PreferenceIndexType[] = [];
    const notFilledPreferences: PreferenceIndexType[] = [];

    for (const [key, value] of Object.entries(preferences)) {
      if (value && value !== "" && value !== "0") {
        filledPreferences.push((key as PreferenceIndexType));
      } else {
        notFilledPreferences.push((key as PreferenceIndexType));
      }
    }

    let notFilledPreferencesToShow = "";

    for (const preference of notFilledPreferences) {
      if (preference in this.preferences) {
        notFilledPreferencesToShow += `- ${this.preferences[preference]}\n`;
      }
    }

    let filledPreferencesToShow = "";

    for (const preference of filledPreferences) {
      if (preference in this.preferences) {
        if (preference === 'price_from' || preference === 'price_to') {
          filledPreferencesToShow += `- ${this.preferences[preference]}: ${this.formatPrice(Number(preferences[preference]))}\n`;
        } else {
          filledPreferencesToShow += `- ${this.preferences[preference]}: ${preferences[preference]}\n`;
        }
      }
    }

    const propertiesData: typeof SearchPropertiesUseCase.Output | Error =
      await this.searchProperties.execute({
        user_id: input.user_id,
      });

    let usedFiltersText = `Filtros utilizados:\n${filledPreferencesToShow}`;

    if (filledPreferences.length <= 7
      && !(propertiesData instanceof Error)
      && propertiesData.properties.length > 0) {
      usedFiltersText += `\n\nPreferências que também podem ser preenchidas:\n${notFilledPreferencesToShow}`;
    }

    if (
      propertiesData instanceof Error ||
      propertiesData.properties.length == 0
    ) {
      return JSON.stringify({
        return_message:
          `Não foi possível encontrar imóveis com suas preferências no momento, podemos atualizar suas preferências ou criar um alerta para avisar quando houverem imóveis disponíveis para você.\n\n${usedFiltersText}`,
      });
    }

    let foundPropertiesText = `esses`;

    if (propertiesData.quantity > 0) {
      foundPropertiesText += ` e outros ${propertiesData.quantity}`;
    }

    return JSON.stringify({
      return_message: `Encontrei, ${foundPropertiesText} imóveis que podem ser de seu interesse:\n\n${this.formatPropertiesWhatsappMessage(propertiesData.properties)}\n\n${usedFiltersText}\n\nCaso queira ver mais opções ou alterar as preferências, basta me pedir. Podemos:\n1. Atualizar as preferências\n2. Mostrar mais imóveis`,
    });
  }

  private formatPropertiesWhatsappMessage(
    properties: PropertyEntity[]
  ): string {
    let message = "";
    for (const property of properties) {
      message += `🏘️ ${property.city} - ${property.neighborhood}\n`;
      message += `🛏 Quartos: ${property.bedrooms}\n`
      message += `🛁 Banheiros: ${property.bathrooms}\n`;
      message += `🏡 Tipo: ${property.property_type}\n`
      message += `💰 Preço: ${this.formatPrice(property.price)}\n`;
      message += `📌 Url: ${property.url}\n\n`;
    }
    return message;
  }

  private formatPrice(price: number): string {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

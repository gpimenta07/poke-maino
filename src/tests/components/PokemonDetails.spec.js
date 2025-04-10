import { mount, flushPromises } from "@vue/test-utils";
import PokemonDetails from "../../pages/PokemonDetails.vue";
import { createI18n } from "vue-i18n";
import messages from "../../i18n/i18n";
import axios from "axios";

// Mock do axios
vi.mock("axios");

// Mock do vue-router (evita erro de "No match found for location with path /")
vi.mock("vue-router", () => ({
  useRoute: () => ({
    params: {
      name: "pikachu",
    },
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Criação do i18n
const i18n = createI18n({
  legacy: false,
  locale: "en",
  messages,
});

describe("PokemonDetails.vue", () => {
  it("renderiza detalhes do Pokémon após carregamento", async () => {
    // Mock dos dados da PokéAPI
    axios.get
      .mockResolvedValueOnce({
        data: {
          name: "pikachu",
          sprites: {
            front_default: "url1",
            other: {
              "official-artwork": {
                front_default: "artwork-url",
              },
            },
          },
          moves: [{ move: { name: "thunderbolt" } }],
          game_indices: [{ version: { name: "red" } }],
          species: { url: "species-url" },
        },
      })
      .mockResolvedValueOnce({
        data: {
          evolution_chain: { url: "evo-chain-url" },
        },
      })
      .mockResolvedValueOnce({
        data: {
          chain: {
            species: { name: "pikachu" },
            evolves_to: [],
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          sprites: {
            other: {
              "official-artwork": {
                front_default: "evo-url",
              },
            },
          },
        },
      });

    const wrapper = mount(PokemonDetails, {
      global: {
        plugins: [i18n],
        stubs: ["router-link"],
      },
    });

    await flushPromises();

    expect(wrapper.text().toLowerCase()).toContain("pikachu");
    expect(wrapper.text().toLowerCase()).toContain("thunderbolt");
    expect(wrapper.text().toLowerCase()).toContain("red");
  });
});

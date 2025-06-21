import { AccessCredentialsStorage } from "@/utils/access-credentials-storage";
import { GridContent } from "@/components/atoms/page-content/grid-content";
import { PageBody } from "@/components/atoms/page-content/page-body";
import { BarChart } from "@/components/atoms/bar-chart/bar-chart";
import { PieChart } from "@/components/atoms/pie-chart/pie-chart";
import { useRequestSender } from "@/hooks/use-request-sender";
import { Grid } from "@/components/atoms/page-content/grid";
import { Flex } from "@/components/atoms/page-content/flex";
import { useLoading } from "@/contexts/loading-context";
import { Icon } from "@/components/atoms/icon/icon";
import { Span } from "@/components/atoms/span/span";
import { IconEnum } from "@/enums/icon-enum";
import { useEffect, useState } from "react";
import { Env } from "@/config/env";

export default function GeneralDashboardPage() {
  const { startLoading, stopLoading } = useLoading();
  const { get } = useRequestSender();
  const { API_URL } = Env;

  const [data, setData] = useState({
    property_quantity: 0,
    property_sent_quantity: 0,
    property_clicked_quantity: 0,
    real_estate_quantity: 0,
    phone_number_quantity: 0,
    new_properties: [
      {
        year: 0,
        month: 0,
        quantity: 0,
      }
    ],
    properties_by_real_estate: [
      {
        id: "",
        name: "",
        quantity: 0,
      }
    ],
    sent_properties: [
      {
        year: 0,
        month: 0,
        quantity: 0,
      }
    ],
    sent_properties_by_real_estate: [
      {
        id: "",
        name: "",
        quantity: 0,
      }
    ],
    clicked_properties: [
      {
        year: 0,
        month: 0,
        quantity: 0,
      }
    ],
    clicked_properties_by_real_estate: [
      {
        id: "",
        name: "",
        quantity: 0,
      }
    ],
    property_types: [
      {
        type: "",
        quantity: 0,
      }
    ],
    property_types_clicks: [
      {
        type: "",
        quantity: 0,
      }
    ],
    property_conditions: [
      {
        condition: "",
        quantity: 0,
      }
    ],
    property_conditions_clicks: [
      {
        condition: "",
        quantity: 0,
      }
    ],
  });

  const fetchData = async () => {
    try {
      startLoading();
      const response = await get(`${API_URL}/dashboards/general`, {
        token: AccessCredentialsStorage.get().token
      });
      setData(response);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
    finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <PageBody>
      <Grid>
        <GridContent size="large" padding={false}>
          <Grid>
            <GridContent size="small" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.home}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Propriedades</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.property_quantity}</Span>
              </Flex>
            </GridContent>
            <GridContent size="small" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.send}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Propriedades enviadas</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.property_sent_quantity}</Span>
              </Flex>
            </GridContent>
            <GridContent size="small" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.save}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Propriedades clicadas</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.property_clicked_quantity}</Span>
              </Flex>
            </GridContent>
            <GridContent size="small" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.building}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Imobiliárias</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.real_estate_quantity}</Span>
              </Flex>
            </GridContent>
            <GridContent size="small" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.users}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Usuários</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.phone_number_quantity}</Span>
              </Flex>
            </GridContent>
          </Grid>
        </GridContent>

        {data.new_properties.length > 0 &&
          <GridContent size={"large"} title={"Propriedades adicionadas"}>
            <BarChart
              key={data.new_properties.map(item => `${item.month}-${item.year}`).join('-')}
              labels={data.new_properties.map(
                (item) => `${item.month < 10 ? `0${item.month}` : item.month}/${item.year}`
              )}
              data={
                [{
                  label: `Propriedades`,
                  values: data.new_properties.map(item => item.quantity),
                  type: "bar",
                }]
              }
            />
          </GridContent>}

        {data.properties_by_real_estate.length > 0 &&
          <GridContent size={"large"} title={"Propriedades enviadas"}>
            <BarChart
              labels={data.sent_properties.map(
                (item) => `${item.month < 10 ? `0${item.month}` : item.month}/${item.year}`
              )}
              data={
                [{
                  label: `Propriedades`,
                  values: data.sent_properties.map(item => item.quantity),
                  type: "bar",
                }]
              }
            />
          </GridContent>}

        <GridContent
          size={"large"}
          title={"Propriedades totais por imobiliária"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.properties_by_real_estate.map(item => ({
              label: item.name,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>

        <GridContent
          size={"medium"}
          title={"Propriedades enviadas por imobiliária"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.sent_properties_by_real_estate.map(item => ({
              label: item.name,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>

        <GridContent
          size={"medium"}
          title={"Propriedades clicadas por imobiliária"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.clicked_properties_by_real_estate.map(item => ({
              label: item.name,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>

        {data.clicked_properties.length > 0 &&
          <GridContent size={"large"} title={"Propriedades clicadas"}>
            <BarChart
              labels={data.clicked_properties.map(
                (item) => `${item.month < 10 ? `0${item.month}` : item.month}/${item.year}`
              )}
              data={
                [{
                  label: `Propriedades`,
                  values: data.clicked_properties.map(item => item.quantity),
                  type: "bar",
                }]
              }
            />
          </GridContent>}

        <GridContent
          size={"medium"}
          title={"Tipos de propriedades"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.property_types.map(item => ({
              label: item.type,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>

        <GridContent
          size={"medium"}
          title={"Cliques por tipos de propriedades"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.property_types_clicks.map(item => ({
              label: item.type,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>

        <GridContent
          size={"medium"}
          title={"Condições das propriedades"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.property_conditions.map(item => ({
              label: item.condition,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>

        <GridContent
          size={"medium"}
          title={"Cliques por condições das propriedades"}
        >
          <div className="flex justify-content-center">
            <PieChart data={data.property_conditions_clicks.map(item => ({
              label: item.condition,
              value: item.quantity,
            }))} />
          </div>
        </GridContent>
      </Grid>
    </PageBody>
  );
}

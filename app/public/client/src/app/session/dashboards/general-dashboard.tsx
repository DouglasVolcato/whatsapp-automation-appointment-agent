import { AccessCredentialsStorage } from "@/utils/access-credentials-storage";
import { GridContent } from "@/components/atoms/page-content/grid-content";
import { PageBody } from "@/components/atoms/page-content/page-body";
import { BarChart } from "@/components/atoms/bar-chart/bar-chart";
import { useRequestSender } from "@/hooks/use-request-sender";
import { Grid } from "@/components/atoms/page-content/grid";
import { Flex } from "@/components/atoms/page-content/flex";
import { useLoading } from "@/contexts/loading-context";
import { Icon } from "@/components/atoms/icon/icon";
import { Span } from "@/components/atoms/span/span";
import { IconEnum } from "@/enums/icon-enum";
import { useEffect, useState } from "react";
import { Env } from "@/config/env";

type DataList = {
  quantity: number,
  year: number,
  month: number
}
type DefaultValueType = {
  totals: {
    user_quantity: number,
    appointment_quantity: number,
  },
  createdUsers: DataList[],
  updatedUsers: DataList[],
  createdAppointments: DataList[]
}

export default function GeneralDashboardPage() {
  const { startLoading, stopLoading } = useLoading();
  const { get } = useRequestSender();
  const { API_URL } = Env;

  const [data, setData] = useState<DefaultValueType>({
    totals: {
      user_quantity: 0,
      appointment_quantity: 0,
    },
    createdUsers: [],
    updatedUsers: [],
    createdAppointments: []
  });

  const fetchData = async () => {
    try {
      startLoading();
      const response = await get(`${API_URL}/dashboard/get-data`, {
        token: AccessCredentialsStorage.get().token
      });
      setData(response);
    } catch (error) {
      console.error(error);
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
            <GridContent size="medium" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.users}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Usuários</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.totals.user_quantity}</Span>
              </Flex>
            </GridContent>
            <GridContent size="medium" padding={true}>
              <Flex>
                <Icon
                  icon={IconEnum.calendar_plus}
                  fontSize="1.5rem"
                  fontColor="lightblue"
                />
                <Span fontSize="1.0rem">Reuniões</Span>
              </Flex>
              <Flex>
                <Span fontSize="1.0rem">{data.totals.appointment_quantity}</Span>
              </Flex>
            </GridContent>
          </Grid>
        </GridContent>

        {data.createdUsers.length > 0 &&
          <GridContent size={"large"} title={"Usuários cadastrados"}>
            <BarChart
              key={data.createdUsers.map(item => `${item.month}-${item.year}`).join('-')}
              labels={data.createdUsers.map(
                (item) => `${item.month < 10 ? `0${item.month}` : item.month}/${item.year}`
              )}
              data={
                [{
                  label: `Usuarios`,
                  values: data.createdUsers.map(item => item.quantity),
                  type: "bar",
                }]
              }
            />
          </GridContent>}

        {data.updatedUsers.length > 0 &&
          <GridContent size={"large"} title={"Usuários atualizados"}>
            <BarChart
              key={data.updatedUsers.map(item => `${item.month}-${item.year}`).join('-')}
              labels={data.updatedUsers.map(
                (item) => `${item.month < 10 ? `0${item.month}` : item.month}/${item.year}`
              )}
              data={
                [{
                  label: `Usuarios`,
                  values: data.updatedUsers.map(item => item.quantity),
                  type: "bar",
                }]
              }
            />
          </GridContent>}

        {data.createdAppointments.length > 0 &&
          <GridContent size={"large"} title={"Reuniões agendadas"}>
            <BarChart
              key={data.createdAppointments.map(item => `${item.month}-${item.year}`).join('-')}
              labels={data.createdAppointments.map(
                (item) => `${item.month < 10 ? `0${item.month}` : item.month}/${item.year}`
              )}
              data={
                [{
                  label: `Usuarios`,
                  values: data.createdAppointments.map(item => item.quantity),
                  type: "bar",
                }]
              }
            />
          </GridContent>}
      </Grid>
    </PageBody>
  );
}

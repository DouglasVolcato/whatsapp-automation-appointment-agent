import { RealStateAgencyEntity } from "@/abstract/entities/real-state-agency-entity";
import { AccessEntity, CreateAccessDto } from "@/abstract/entities/access-entity";
import { AccessCredentialsStorage } from "@/utils/access-credentials-storage";
import { useRequestSender } from "@/hooks/use-request-sender";
import { useLoading } from "@/contexts/loading-context";
import { useEffect, useState } from "react";
import { Env } from "@/config/env";
import Table from "@/components/cells/table/table";
import { PageBody } from "@/components/atoms/page-content/page-body";
import { useConfirmation } from "@/contexts/confirmation-context";
import { Modal } from "@/components/atoms/modal/modal";
import { FieldSizeEnum, Form } from "@/components/cells/form/form";
import { IconEnum } from "@/enums/icon-enum";
import { ValidationEnum } from "@/components/cells/form/validate-value";
import { FloatDiv } from "@/components/atoms/floating-div/floating-div";

export default function AccessCredentialsPage() {
    const { startLoading, stopLoading } = useLoading();
    const { setConfirmation } = useConfirmation()
    const request = useRequestSender();
    const { API_URL } = Env;

    const [accessListOffset, setAccessListOffset] = useState<number>(0);
    const accessListLimit = 20;

    const [agencies, setAgencies] = useState<RealStateAgencyEntity[]>([]);
    const [acesses, setAcesses] = useState<AccessEntity[]>([]);
    const [showCreateAccessModal, setShowCreateAccessModal] = useState<boolean>(false);

    const getAgencies = async (search: string = '') => {
        try {
            const response = await request.get(`${API_URL}/real-estate-agency/get-agencies?limit=100&offset=0&name_like=${search}`, {
                token: AccessCredentialsStorage.get().token
            });
            setAgencies(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getAcesses = async () => {
        try {
            startLoading();
            const response = await request.get(`${API_URL}/auth/get-access-credentials?limit=${accessListLimit}&offset=${accessListOffset}`, {
                token: AccessCredentialsStorage.get().token
            });
            setAcesses(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            stopLoading();
        }
    };

    const createAccess = async (data: CreateAccessDto) => {
        try {
            startLoading();
            await request.post(`${API_URL}/auth/create-access-credential`,
                data,
                { token: AccessCredentialsStorage.get().token }
            );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setShowCreateAccessModal(false);
            getAcesses();
        }
    };

    const deleteAcessesConfirmation = async (access_id: string) => {
        setConfirmation({
            show: true,
            title: "Exclusão",
            message: "Tem certeza que deseja excluir essa credencial de acesso?",
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            onAccept: () => deleteAcesses(access_id),
            onReject: () => { },
        })
    }

    const deleteAcesses = async (access_id: string) => {
        try {
            startLoading();
            await request.delete(`${API_URL}/auth/delete-access-credential?access_id=${access_id}`,
                { token: AccessCredentialsStorage.get().token }
            );
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            getAcesses();
        }
    };

    useEffect(() => {
        getAgencies();
    }, [])

    useEffect(() => {
        getAcesses();
    }, [accessListOffset])

    return (
        <>
            <PageBody>
                <FloatDiv fitContent={true}>
                    <Table
                        title="Credencias de acesso"
                        items={acesses}
                        columns={[
                            {
                                name: "Email",
                                field: "email",
                            },
                            {
                                name: "Tipo",
                                field: "access_type",
                            },
                            {
                                name: "Imobiliária",
                                field: "agency",
                            },
                        ]}
                        filters={<></>}
                        onAddNewItem={() => {
                            setShowCreateAccessModal(true);
                        }}
                        onDeleteItem={(item: AccessEntity) => {
                            deleteAcessesConfirmation(item.id);
                        }}
                        onNextPage={() => {
                            setAccessListOffset(accessListOffset + accessListLimit);
                        }}
                        onPreviousPage={() => {
                            setAccessListOffset(Math.max(0, accessListOffset - accessListLimit));
                        }}
                        showPagination={true}
                        showLastPageButton={accessListOffset > 0}
                    />
                </FloatDiv>
            </PageBody>

            {showCreateAccessModal && (
                <Modal
                    label="Criar credencial de acesso"
                    show={showCreateAccessModal}
                    onClose={() => setShowCreateAccessModal(false)}
                >
                    <Form
                        title=""
                        inputs={[
                            {
                                label: "Email",
                                validators: [
                                    {
                                        type: ValidationEnum.required,
                                        message: "O campo email é obrigatório",
                                    },
                                    {
                                        type: ValidationEnum.email,
                                        message: "O campo email é inválido",
                                    },
                                ],
                                name: "email",
                                type: "email",
                                size: FieldSizeEnum.medium,
                                value: "",
                                placeholder: "Digite seu email",
                            },
                            {
                                label: "Senha",
                                validators: [
                                    {
                                        type: ValidationEnum.required,
                                        message: "O campo senha é obrigatório",
                                    },
                                    {
                                        type: ValidationEnum.minLength5,
                                        message: "O campo senha deve ter no mínimo 5 caracteres",
                                    },
                                ],
                                name: "password",
                                type: "password",
                                size: FieldSizeEnum.medium,
                                value: "",
                                placeholder: "Digite a senha",
                            },
                            {
                                label: "Tipo de acesso",
                                validators: [
                                    {
                                        type: ValidationEnum.required,
                                        message: "O campo tipo de acesso é obrigatório",
                                    },
                                ],
                                name: "access_type",
                                type: "select",
                                size: FieldSizeEnum.medium,
                                value: "",
                                onFilter: (() => { }),
                                placeholder: "Selecione um tipo de acesso",
                                options: [
                                    {
                                        label: "Administrador",
                                        value: "admin",
                                    },
                                    {
                                        label: "Imobiliária",
                                        value: "imobiliaria",
                                    },
                                ],
                            },
                            {
                                label: "Imobiliária",
                                validators: [],
                                name: "agency_id",
                                type: "select",
                                size: FieldSizeEnum.medium,
                                value: "",
                                onFilter: (search => getAgencies(search)),
                                placeholder: "Selecione uma imobiliária",
                                options: agencies.map((agency) => ({
                                    label: agency.name,
                                    value: agency.id,
                                })),
                            },
                        ]}
                        anchors={[]}
                        buttons={[
                            {
                                text: "Criar",
                                type: "submit",
                                color: "primary",
                                icon: IconEnum.send,
                            },
                        ]}
                        onSubmit={createAccess}
                    />
                </Modal>
            )}
        </>
    );
}
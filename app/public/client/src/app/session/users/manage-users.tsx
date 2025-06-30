import { AccessCredentialsStorage } from '@/utils/access-credentials-storage';
import { ValidationEnum } from '@/components/cells/form/validate-value';
import { PageBody } from '@/components/atoms/page-content/page-body';
import { FieldSizeEnum, Form } from '@/components/cells/form/form';
import { useConfirmation } from '@/contexts/confirmation-context';
import { useRequestSender } from '@/hooks/use-request-sender';
import { useLoading } from '@/contexts/loading-context';
import { Modal } from '@/components/atoms/modal/modal';
import Table from '@/components/cells/table/table';
import { IconEnum } from '@/enums/icon-enum';
import { useEffect, useState } from 'react';
import { Env } from '@/config/env';

export type UserType = {
    id: string;
    name: string;
    phone: string;
    email: string;
    relation_with_master: string,
    what_likes: string,
    what_knows: string,
    what_does: string,
};

export default function ManageUsers() {
    const { get_request, delete_request, patch_request } = useRequestSender();
    const { startLoading, stopLoading } = useLoading();
    const { setConfirmation } = useConfirmation();
    const [offset, setOffset] = useState(0);
    const { API_URL } = Env;

    const [data, setData] = useState<UserType[]>([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState<UserType | undefined>();

    useEffect(() => {
        fetchData();
    }, [offset]);

    const fetchData = async () => {
        try {
            startLoading();
            const response = await get_request(`${API_URL}/user/get-many?offset=${offset}&limit=15`, {
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

    const deleteUser = (user: UserType) => {
        setConfirmation({
            show: true,
            title: "Apagar usuário",
            message: "Gostaria de apagar esse usuário?",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            onAccept: () => sendDeleteUser(user),
            onReject: () => { },
        })
    };

    const sendDeleteUser = async (user: UserType) => {
        try {
            const id = user.id;
            startLoading();
            await delete_request(`${API_URL}/user/delete?id=${id}`, {
                token: AccessCredentialsStorage.get().token
            });
            await fetchData();
        } catch (error) {
            console.error(error);
        }
        finally {
            stopLoading();
        }
    };

    const editUser = (user: UserType) => {
        setUserToEdit(user);
        setShowEditModal(true);
    };

    const sendEditUser = async (user: UserType) => {
        try {
            startLoading();
            await patch_request(`${API_URL}/user/update`,
                { ...user, id: userToEdit?.id },
                { token: AccessCredentialsStorage.get().token }
            )
            await fetchData();
        } catch (error) {
            console.error(error);
        } finally {
            stopLoading();
            setShowEditModal(false);
        }
    };

    return (
        <>
            <PageBody>
                <Table
                    title="Usuários"
                    columns={[
                        {
                            field: 'name',
                            name: 'Nome'
                        },
                        {
                            field: 'email',
                            name: 'Email'
                        },
                        {
                            field: 'phone',
                            name: 'Telefone'
                        },
                        {
                            field: 'relation_with_master',
                            name: 'Relação'
                        },
                        {
                            field: 'what_likes',
                            name: 'Oque gosta'
                        },
                        {
                            field: 'what_knows',
                            name: 'Oque sabe'
                        },
                        {
                            field: 'what_does',
                            name: 'Oque faz'
                        },
                    ]}
                    items={data}
                    onNextPage={() => setOffset(offset + 15)}
                    onPreviousPage={() => setOffset(offset - 15)}
                    showLastPageButton={offset > 0}
                    showPagination={true}
                    onDeleteItem={deleteUser}
                    onEditItem={editUser}
                />
                <Modal show={showEditModal} onClose={() => setShowEditModal(false)} label="Editar usuário">
                    <Form
                        title='Usuário'
                        inputs={[
                            {
                                name: "name",
                                label: "Nome",
                                type: "text",
                                value: userToEdit?.name || '',
                                placeholder: "Digite o nome",
                                size: FieldSizeEnum.medium,
                                validators: [{
                                    type: ValidationEnum.required,
                                    message: "Campo obrigatório",
                                }, {
                                    type: ValidationEnum.minLength5,
                                    message: "Deve ter no mínimo 5 caracteres",
                                }]
                            },
                            {
                                name: "email",
                                label: "Email",
                                type: "email",
                                value: userToEdit?.email || '',
                                placeholder: "Digite o email",
                                size: FieldSizeEnum.medium,
                                validators: [{
                                    type: ValidationEnum.email,
                                    message: "Campo inválido",
                                }]
                            }, {
                                name: "phone",
                                label: "Telefone",
                                type: "text",
                                value: userToEdit?.phone || '',
                                placeholder: "Digite o telefone",
                                size: FieldSizeEnum.medium,
                                validators: [],
                                disabled: true,
                            }, {
                                name: "relation_with_master",
                                label: "Relação",
                                type: "text",
                                value: userToEdit?.relation_with_master || '',
                                placeholder: "Digite a relação",
                                size: FieldSizeEnum.medium,
                                validators: [],
                            },
                            {
                                name: "what_likes",
                                label: "Oque gosta",
                                type: "text",
                                value: userToEdit?.what_likes || '',
                                placeholder: "Oque gosta",
                                size: FieldSizeEnum.medium,
                                validators: [],
                            },
                            {
                                name: "what_knows",
                                label: "Oque sabe",
                                type: "text",
                                value: userToEdit?.what_knows || '',
                                placeholder: "Oque sabe",
                                size: FieldSizeEnum.medium,
                                validators: [],
                            },
                            {
                                name: "what_does",
                                label: "Oque faz",
                                type: "text",
                                value: userToEdit?.what_does || '',
                                placeholder: "Oque faz",
                                size: FieldSizeEnum.medium,
                                validators: [],
                            },
                        ]}
                        anchors={[]}
                        buttons={[
                            {
                                text: "Cancelar",
                                type: "button",
                                color: "danger",
                                icon: IconEnum.times,
                                onClick: () => setShowEditModal(false),
                            },
                            {
                                text: "Enviar",
                                type: "submit",
                                color: "primary",
                                icon: IconEnum.send,
                            },
                        ]}
                        onSubmit={sendEditUser}
                    />
                </Modal>
            </PageBody>
        </>
    );
}

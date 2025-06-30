import { PageBody } from '@/components/atoms/page-content/page-body';
import { useRequestSender } from '@/hooks/use-request-sender';
import { useLoading } from '@/contexts/loading-context';
import Table from '@/components/cells/table/table';
import { Env } from '@/config/env';
import { useEffect, useState } from 'react';
import { AccessCredentialsStorage } from '@/utils/access-credentials-storage';

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
    const { startLoading, stopLoading } = useLoading();
    const [offset, setOffset] = useState(0);
    const { get } = useRequestSender();
    const { API_URL } = Env;
    const [data, setData] = useState<UserType[]>([]);

    const fetchData = async () => {
        try {
            startLoading();
            const response = await get(`${API_URL}/user/get-many?offset=${offset}&limit=15`, {
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
    }, [offset]);

    return (
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
            />
        </PageBody>
    );
}

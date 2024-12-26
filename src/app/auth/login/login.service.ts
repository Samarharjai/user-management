import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { BASE_URL } from '../../constants';

export interface LoginResponse {
  token: string;
  user: { id: string; name: string; email: string };
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpClient = inject(HttpClient);
  private queryClient = inject(QueryClient);

  loginMutation = injectMutation(() => ({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await this.httpClient
        .post<LoginResponse>(`${BASE_URL}/users/login`, data)
        .toPromise(); // Await response
      this.queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
      return response;
    },
  }));

  get isLoading(): boolean {
    return this.loginMutation.isPending();
  }

  get data(): LoginResponse | null {
    return this.loginMutation.data() || null;
  }

  get error(): any {
    return this.loginMutation.error || null;
  }

  mutate(data: { email: string; password: string }) {
    this.loginMutation.mutate(data);
  }
}

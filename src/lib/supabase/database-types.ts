export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      PoolMembers: {
        Row: {
          joined_at: string
          pool_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          pool_id?: string
          user_id?: string
        }
        Update: {
          joined_at?: string
          pool_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "PoolMembers_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "ProblemPools"
            referencedColumns: ["pool_id"]
          },
          {
            foreignKeyName: "PoolMembers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PoolMembers_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      ProblemPools: {
        Row: {
          created_at: string
          created_by: string
          pool_desc: string | null
          pool_id: string
          pool_name: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          pool_desc?: string | null
          pool_id?: string
          pool_name?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          pool_desc?: string | null
          pool_id?: string
          pool_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ProblemPools_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ProblemPools_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      Problems: {
        Row: {
          created_at: string
          created_by: string
          description: string
          pool_id: string
          problem_id: string
          title: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description: string
          pool_id?: string
          problem_id?: string
          title: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          pool_id?: string
          problem_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Problems_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Problems_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Problems_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "ProblemPools"
            referencedColumns: ["pool_id"]
          },
        ]
      }
      Solutions: {
        Row: {
          created_at: string
          created_by: string
          problem_id: string | null
          solution: string
          solution_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          problem_id?: string | null
          solution?: string
          solution_id?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          problem_id?: string | null
          solution?: string
          solution_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Solutions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Solutions_created_by_fkey1"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "Solutions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "Problems"
            referencedColumns: ["problem_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          user_id?: string
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

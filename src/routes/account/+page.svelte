<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { enhance } from "$app/forms";
  import { superForm } from "sveltekit-superforms/client";
</script>

<form method="POST" use:enhance>
  <div class="flex items-center justify-center pt-16">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Account Preferences</CardTitle>
        <CardDescription>Change your account preferences here.</CardDescription>
      </CardHeader>
      <CardContent>
        <!-- change username and email -->
        <h1>{data.user.name}</h1>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  </div>
</form>

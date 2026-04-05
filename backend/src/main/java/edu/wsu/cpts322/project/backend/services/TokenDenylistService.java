package edu.wsu.cpts322.project.backend.services;

import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory JWT denylist keyed on the token's jti claim.
 *
 * On logout the jti is added here; JwtAuthenticationFilter rejects any
 * token whose jti is present, even if the token is still cryptographically
 * valid.
 *
 * NOTE: This implementation is suitable for a single-node deployment.
 * For multi-node / production use, replace the in-memory set with a
 * Redis SET and use SETEX with the token's remaining TTL so entries
 * expire automatically:
 *
 *   redisTemplate.opsForValue().set("denylist:" + jti, "1",
 *       remainingTtlSeconds, TimeUnit.SECONDS);
 */
@Service
public class TokenDenylistService {

    private final Set<String> deniedJtis = Collections.newSetFromMap(new ConcurrentHashMap<>());

    /** Add a jti to the denylist (call on logout). */
    public void deny(String jti) {
        deniedJtis.add(jti);
    }

    /** Returns true if the jti has been denied (token was logged out). */
    public boolean isDenied(String jti) {
        return deniedJtis.contains(jti);
    }
}